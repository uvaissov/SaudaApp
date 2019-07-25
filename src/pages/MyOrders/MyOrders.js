import React, {Component} from 'react'
//import _ from 'lodash'
//import axios from 'axios'
import { StyleSheet, View, ScrollView, FlatList } from 'react-native'
import { connect } from 'react-redux'
import Header from '../../components/main/Header'
import Footer from '../../components/main/Footer'
import CustomStatusBar from '../../components/CustomStatusBar'
import { HeaderButtonContainer } from '../Profile/view/HeaderButtonContainer'
import ItemOrderView from './view/ItemOrderView'
import OrderHeaderView from './view/OrderHeaderView'
import { getMyOrders } from './actions'
import { FONT, BG_COLOR, normalize } from '../../constants/global'
import { } from '../../transform'

class MyOrders extends Component {
  async componentDidMount() {
    this.props.getMyOrders()
  }

  _renderItem = ({item}) => (<ItemOrderView item={item} />)
  _renderHeader = () => (<OrderHeaderView />)
  _renderFlat = () => {
    const { items } = this.props  
    return (
      <FlatList 
        ListHeaderComponent={this._renderHeader}
        data={items}
        renderItem={this._renderItem}
        keyExtractor={(item) => item.id}
      />
    )
  }
  
  render() {
    const { navigation, token } = this.props
    return (
      <View style={[styles.container]}>
        <CustomStatusBar backgroundColor="#fff" barStyle="dark-content" />
        <Header onPress={() => navigation.openDrawer()} />
        <HeaderButtonContainer selected="orders" navigation={navigation} token={token} />
        <ScrollView showsVerticalScrollIndicator={false} style={styles.scrollView}>          
          <View style={styles.bodyView}>
            {this._renderFlat()}
          </View>
        </ScrollView>
        <Footer navigation={navigation} />
      </View>
    )
  }
}

const styles = StyleSheet.create({  
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    backgroundColor: BG_COLOR
  },
  scrollView: {
    flex: 1
  },
  text: {
    fontFamily: FONT,
    fontSize: normalize(15),
    marginTop: 20
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
    items: state.orders.items,
    token: state.auth.token
  }
}
export default connect(mapStateToProps, { getMyOrders })(MyOrders)
