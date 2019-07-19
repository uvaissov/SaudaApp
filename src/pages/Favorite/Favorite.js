import React, {Component} from 'react'
import _ from 'lodash'
import { StyleSheet, View, ScrollView, FlatList } from 'react-native'
import { connect } from 'react-redux'
import Header from '../../components/main/Header'
import Footer from '../../components/main/Footer'
import ItemFavView from './view/ItemFavView'
import CustomStatusBar from '../../components/CustomStatusBar'
import { addToCard, getCard } from '../Card/actions'
import ProductAdded from '../../components/modals/ProductAdded'
import { } from './actions'
import { BG_COLOR } from '../../constants/global'
import { } from '../../transform'

class Favotite extends Component {
  state ={
    productAddShow: false
  }
  async componentDidMount() {
    console.log('Fav dm')
  }

  _addToCard = async (id, q) => {
    await this.props.addToCard(id, q)
    this.setState({productAddShow: true})
    this.props.getCard()
  }

  _removeFromFav =async (id) => {
    console.log(id)
  }

  _renderItem =({ item }) => {
    //const { navigation } = this.props
    return (<ItemFavView key={_.uniqueId('ItemFavView')} onCardPress={this._addToCard} item={item} onPress={() => {}} />)
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
  render() {
    const { navigation } = this.props 
    const { productAddShow } = this.state
    return (
      <View style={[styles.container]}>
        <CustomStatusBar backgroundColor="#fff" barStyle="dark-content" />
        <Header onPress={() => navigation.openDrawer()} />
        <ProductAdded visibility={productAddShow} hide={() => this.setState({productAddShow: false})} />
        <ScrollView showsVerticalScrollIndicator={false} style={styles.scrollView}>          
          {this._renderFlat()}                
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
    paddingVertical: 25,
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
    items: state.favorite.items
  }
}
export default connect(mapStateToProps, { addToCard, getCard })(Favotite)
