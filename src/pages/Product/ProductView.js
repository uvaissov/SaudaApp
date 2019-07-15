import React, {Component} from 'react'
import { StyleSheet, Text, View, TouchableOpacity, ScrollView, FlatList } from 'react-native'
import Ionicons from 'react-native-vector-icons/Ionicons'
import FastImage from 'react-native-fast-image'
import axios from 'axios'
import HTML from 'react-native-render-html'
import Header from '../../components/main/Header'
import Footer from '../../components/main/Footer'
import ItemRowView from '../Catalog/view/ItemRowView'
import CustomStatusBar from '../../components/CustomStatusBar'
import { w, hostName } from '../../constants/global'
import { Button } from '../Catalog/view/Button'
import { CountControl } from '../Catalog/view/CountControl'
import Loader from '../../components/Loader'
import { transformProduct } from '../../transform'

class ProductView extends Component {
  state={
    isLoading: true,
    item: null,
    count: 1,
    oftenBuy: []
  }
  async componentDidMount() {
    const { id } = this.props.navigation.getParam('product')
    axios.get(`${hostName}/api/v1/offer/${id}`)
      .then((res) => {
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
    return (<ItemRowView item={item} onPress={() => navigation.push('ProductView', { product: item })} />)
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
  render() {
    const { isLoading, item, count, oftenBuy } = this.state
    const { navigation } = this.props
    if (isLoading === true) {
      return (<Loader animating={!isLoading} />)
    }
    console.log('oftenBuy', oftenBuy)
    return (
      <View style={[styles.container]}>
        <CustomStatusBar backgroundColor="#fff" barStyle="dark-content" />
        <Header onPress={() => navigation.openDrawer()} />
        <ScrollView showsVerticalScrollIndicator={false} style={styles.scrollView}>
          <View style={styles.favoritePos}>
            <TouchableOpacity onPress={() => {}}>
              <Ionicons name="md-heart-empty" size={50} color="#FF798D" />
            </TouchableOpacity>
          </View>
          <View style={styles.imgView}>
            <FastImage
              style={{ height: 300, width: w - 50 }} 
              height={300}
              width={w - 50}
              source={item.img}
              resizeMode={FastImage.resizeMode.contain}
            />
          </View>          
          <View style={styles.bodyView}>
            <View><Text style={styles.itemTitle} >{item.title}</Text></View>
            <View><Text style={styles.itemDesc} >{item.short_description}</Text></View>
            <View><Text style={styles.itemPriceText}>{item.price} тг</Text></View>
            <View style={{marginTop: 10}}><CountControl count={count} /></View>
            <View style={{marginTop: 10}}><Button title="В корзину" icon="cart" onPress={() => {}} /></View>
            <View style={{marginTop: 10}}><Button style={{backgroundColor: '#E54B65'}} title="В избранное" icon="heart" onPress={() => {}} /></View>
            <View style={{marginBottom: 20}}>
              <HTML allowedStyles={['color']} baseFontStyle={styles.itemDescFull} html={item.description} imagesMaxWidth={w} />
            </View>
          </View>
          {this._renderOftenBy()}
        </ScrollView>
        <Footer />
      </View>
    )
  }
}

const styles = StyleSheet.create({
  imgView: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingBottom: 25
  },
  bodyView: {
    paddingHorizontal: 25
  },
  favoritePos: {
    position: 'absolute', 
    top: 15, 
    right: 25,
    zIndex: 20
  },
  itemDesc: {    
    fontFamily: 'CenturyGothic',
    fontSize: 16,
    color: 'rgba(0,0,0,0.7)',
    marginTop: 10   
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
    justifyContent: 'flex-start'
  },
  scrollView: {
    //margin: 25,
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
export default ProductView
