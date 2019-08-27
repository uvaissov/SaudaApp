import React, {Component} from 'react'
import _ from 'lodash'
import { StyleSheet, Text, View, ScrollView, FlatList, Alert } from 'react-native'
//import axios from 'axios'
import { connect } from 'react-redux'
import Header from '../../components/main/Header'
import Footer from '../../components/main/Footer'
import ItemCardView from './view/ItemCardView'
import CustomStatusBar from '../../components/CustomStatusBar'
import { Button } from '../Catalog/view/Button'
import { addToCard, getCard, removeFromCard, makeOrder } from './actions'
import { getMyOrders } from '../MyOrders/actions'
import { WHITE, RED, BLACK, FONT, BG_COLOR, normalize } from '../../constants/global'
import MakeOrder from './view/MakeOrder'
import { } from '../../transform'

class Card extends Component {
  state= {
    showMake: false
  }
  async componentDidMount() {
    console.log(this.props.profile)
  }
  addWaiting = {}
  _addToCard = async (id, q) => {    
    if (this.addWaiting[id]) {
      clearTimeout(this.addWaiting[id])
    }
    this.addWaiting[id] = setTimeout(() => {
      this.addWaiting[id] = null
      this.props.addToCard(id, q)      
    }, 500)

    if (this.cardWaiting) {
      clearTimeout(this.cardWaiting)
    }
    this.cardWaiting = setTimeout(() => {
      this.cardWaiting = null
      this.props.getCard()     
    }, 3000)
  }
  _removeFromCard =async (id) => {
    await this.props.removeFromCard(id)
    this.props.getCard()
  }

  showDialog = () => {
    const { total_price } = this.props
    if (total_price <= 0) {
      Alert.alert(
        'Корзина пустая',
        'Сначало необходимо добавить товары из каталога',
        [
          {text: 'OK', onPress: () => console.log('OK Pressed')}
        ],
        {cancelable: false},
      )
      return 
    }
    this.setState({showMake: true})
  }

  _makeOrder = async (name, phone, address) => {
    const data = await this.props.makeOrder(name, phone, address)
    const { order_id } = data
    if (_.isNumber(order_id)) {
      Alert.alert(
        'Ваш заказ принят!',
        'Наш менеджер скоро свяжется с вами',
        [
          {text: 'OK', onPress: () => console.log('OK Pressed')}
        ],
        {cancelable: false},
      )
      this.props.getCard()
      if (this.props.token) {
        this.props.getMyOrders()
      }      
    }
  }

  _renderItem =({ item }) => {
    return (<ItemCardView key={_.uniqueId('ItemCardView')} addToCard={this._addToCard} removeFromCard={this._removeFromCard} item={item} onPress={() => {}} />)
  }

  _renderFlat = () => {
    const { items } = this.props  
    return (
      <FlatList 
        data={items}
        renderItem={this._renderItem}
        keyExtractor={(item) => item.id}
      />
    )
  }
  showLogin = () => {
    this.child.profileClick()
  }

  render() {
    const { navigation, total_price } = this.props    
    const { showMake } = this.state
    return (
      <View style={[styles.container]}>
        <CustomStatusBar backgroundColor="#fff" barStyle="dark-content" />
        <Header onPress={() => navigation.openDrawer()} navigation={navigation} />
        <MakeOrder visibility={showMake} action={this._makeOrder} hide={() => this.setState({showMake: false})} />
        <View style={styles.cardTitleView}><Text style={styles.cardTitleText} >Корзина товаров</Text></View>                  
        <ScrollView showsVerticalScrollIndicator={false} style={styles.scrollView}>          
          {this._renderFlat()}
          <View style={styles.totalView} >
            <Text style={styles.totalBoxTitle}>Всего к оплате:</Text>
            <View style={styles.totalBoxView}><Text style={styles.totalBoxText}>{total_price} тг</Text></View>
          </View>
          <View style={styles.buttonView}>
            <Button title="Оформить заказ" style={{paddingHorizontal: 50}} onPress={() => this.showDialog()} />
          </View>       
        </ScrollView>
        <Footer onRef={ref => (this.child = ref)} navigation={navigation} />
      </View>
    )
  }
}

const styles = StyleSheet.create({
  buttonView: {
    alignItems: 'center', paddingVertical: 15
  },
  cardTitleView: {
    backgroundColor: WHITE,
    marginBottom: 15,
    marginTop: 10,
    paddingLeft: 25,
    paddingVertical: 5
  },
  cardTitleText: {
    textTransform: 'uppercase',
    fontSize: normalize(17),
    fontFamily: FONT
  },
  totalBoxView: {
    backgroundColor: RED,
    paddingVertical: 10,
    paddingHorizontal: 30,
    borderRadius: 30
  },
  totalBoxText: {
    color: WHITE,
    fontSize: normalize(12),
    fontFamily: FONT
  },
  totalBoxTitle: {
    color: BLACK,
    fontFamily: FONT,
    fontSize: normalize(12),
    marginRight: 15
  },
  totalView: {
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: 25,
    marginTop: 10
  },
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    backgroundColor: BG_COLOR
  },
  scrollView: {
    flex: 1
  },
  shadow: {
    shadowColor: 'rgba(48, 25, 0, 0.1)',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 16,
    elevation: 8,
    position: 'relative'

  }
})

const mapStateToProps = state => {
  return {
    items: state.card.items,
    isLoadingItems: state.card.isLoadingItems,
    count: state.card.count,
    total_price: state.card.total_price,
    token: state.auth.token,
    profile: state.profile
  }
}
export default connect(mapStateToProps, { addToCard, getCard, removeFromCard, makeOrder, getMyOrders })(Card)
