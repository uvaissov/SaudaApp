import React, {Component} from 'react'
import { StyleSheet, Text, View, TouchableOpacity, ScrollView, FlatList } from 'react-native'
import Ionicons from 'react-native-vector-icons/Ionicons'
import FastImage from 'react-native-fast-image'
import axios from 'axios'
import _ from 'lodash'
import { connect } from 'react-redux'
import HTML from 'react-native-render-html'
import Header from '../../components/main/Header'
import Footer from '../../components/main/Footer'
import ItemRowView from '../Catalog/view/ItemRowView'
import CustomStatusBar from '../../components/CustomStatusBar'
import { w, hostName, GREEN, WHITE, BG_COLOR } from '../../constants/global'
import { Button } from '../Catalog/view/Button'
import { CountControl } from '../Catalog/view/CountControl'
import Loader from '../../components/Loader'
import { transformProduct } from '../../transform'
import ProductAdded from '../../components/modals/ProductAdded'
import { toFav, remFromFav } from '../Favorite/actions'
import { addToCard, getCard } from '../Card/actions'

class ProductView extends Component {
  state={
    isLoading: true,
    productAddShow: false,
    item: null,
    count: 1,
    oftenBuy: []
  }
  async componentDidMount() {
    const { id } = this.props.navigation.getParam('product')
    axios.get(`${hostName}/api/v1/offer/${id}`)
      .then((res) => {
        console.log(res)
        this.setState(
          {
            item: transformProduct(res.data.product), 
            isLoading: false, 
            oftenBuy: res.data.oftenBuy.map((row) => transformProduct(row)) 
          })
      })
      .catch(() => {
        this.setState({ isLoading: false })
      })
  }

  _renderItem =({ item }) => {
    const { navigation } = this.props
    return (<ItemRowView item={item} onCardPress={() => this.setState({productAddShow: true})} onPress={() => navigation.push('ProductView', { product: item })} />)
  }

  _renderOftenBy = () => {
    const { oftenBuy } = this.state
    return (
      <FlatList 
        data={oftenBuy}
        renderItem={this._renderItem}
        keyExtractor={(item) => item.id}
      />
    )
  }

  changeCount = (q) => {
    if (q < 0 && this.state.count < 2) {
      return
    }
    const total = this.state.count + q
    this.setState({count: total })
  }

  toFavorite = (item) => {
    this.props.toFav(item)
  }
  remFavorite = (item) => {
    this.props.remFromFav(item)
  }
  _addToCard = async (id, q) => {
    await this.props.addToCard(id, q)
    this.setState({productAddShow: true})
    this.props.getCard()
  }

  renderFavButton =() => {
    const { items } = this.props
    const { item = {} } = this.state 
    const isExistFromFav = _.findIndex(items, (current) => current.id === item.id)
    if (isExistFromFav > -1) {
      return (<TouchableOpacity onPress={() => this.remFavorite(item)}><View style={styles.favBox}><Ionicons name="md-heart" size={50} color="#FF798D" /></View></TouchableOpacity>)
    }
    return (<TouchableOpacity onPress={() => this.toFavorite(item)}><View style={styles.favBox}><Ionicons name="md-heart-empty" size={50} color="#FF798D" /></View></TouchableOpacity>)
  }

  render() {
    const { isLoading, item, count, productAddShow } = this.state
    const { navigation } = this.props
    if (isLoading === true) {
      return (<Loader />)
    }
    return (
      <View style={[styles.container]}>
        <CustomStatusBar backgroundColor="#fff" barStyle="dark-content" />
        <Header onPress={() => navigation.openDrawer()} navigation={navigation} />
        <ProductAdded navigation={navigation} visibility={productAddShow} hide={() => this.setState({productAddShow: false})} />
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <View style={{marginVertical: 15, backgroundColor: WHITE, paddingHorizontal: 15}}><Text style={[styles.itemDesc, {color: GREEN}]}> В каталог</Text></View>
        </TouchableOpacity>
        <ScrollView showsVerticalScrollIndicator={false} style={styles.scrollView}>
          <View style={[styles.bodyView, styles.shadow]}> 
            <View style={styles.favoritePos}>
              {this.renderFavButton()}
            </View>
            <View style={styles.imgView}>
              <FastImage
                style={{ flex: 1, height: 280, width: undefined }} 
                source={item.img}
                resizeMode={FastImage.resizeMode.contain}
              />
            </View>          
            <View >
              <View><Text style={styles.itemTitle} >{item.title}</Text></View>
              <View><Text style={styles.itemDesc} >{item.short_description}</Text></View>
              <View><Text style={styles.itemPriceText}>{item.price} тг</Text></View>
              <View style={{marginTop: 10}}><CountControl count={count} onPressLeft={() => this.changeCount(-1)} onPressRight={() => this.changeCount(1)} /></View>
              <View style={{marginTop: 10}}><Button title="В корзину" icon="cart" onPress={() => this._addToCard(item.id, count)} /></View>
              <View style={{marginTop: 10}}><Button style={{backgroundColor: '#E54B65'}} title="В избранное" icon="heart" onPress={() => this.toFavorite(item)} /></View>
              <View style={{marginBottom: 20}}>
                <HTML allowedStyles={['color']} baseFontStyle={styles.itemDescFull} html={item.description} imagesMaxWidth={w} />
              </View>
            </View>
          </View>
          {this._renderOftenBy()}
        </ScrollView>
        <Footer navigation={navigation} />
      </View>
    )
  }
}

const styles = StyleSheet.create({
  imgView: {
    marginBottom: 25
  },
  bodyView: {
    marginHorizontal: 25,
    paddingHorizontal: 20,
    paddingTop: 20,
    backgroundColor: WHITE,
    borderWidth: 0,
    marginBottom: 25
  },
  favoritePos: {
    position: 'absolute', 
    top: 15, 
    right: 40,
    zIndex: 20
  },
  itemDesc: {    
    fontFamily: 'CenturyGothic',
    fontSize: 16,
    color: 'rgba(0,0,0,0.7)',
    marginVertical: 10   
  },
  itemDescFull: {    
    fontFamily: 'CenturyGothic',
    fontSize: 14,
    color: 'rgba(0,0,0,0.8)'
  },
  itemTitle: {    
    fontFamily: 'CenturyGothic',
    fontSize: 19,
    color: 'rgba(0,0,0,0.7)',
    textTransform: 'uppercase'
  },
  itemPriceText: {
    fontFamily: 'CenturyGothic',
    fontSize: 16,
    color: '#FF798D',
    marginTop: 10   
  },
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    backgroundColor: BG_COLOR
  },
  scrollView: {
    //margin: 25,
    flex: 1
  },
  shadow: {
    shadowColor: 'rgba(0, 0, 0, 1)',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 8,
    position: 'relative'
  }
})

const mapStateToProps = state => {
  return {      
    items: state.favorite.items
  }
}

export default connect(mapStateToProps, { toFav, remFromFav, addToCard, getCard })(ProductView)

