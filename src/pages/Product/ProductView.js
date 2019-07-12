import React, {Component} from 'react'
import { StyleSheet, Text, View } from 'react-native'
import Ionicons from 'react-native-vector-icons/Ionicons'
import FastImage from 'react-native-fast-image'
import axios from 'axios'
import { w, hostName } from '../../constants/global'
import { Button } from '../Catalog/view/Button'
import Loader from '../../components/Loader'
import { transformProduct } from '../../transform'

class ProductView extends Component {
  state={
    isLoading: true
  }
  async componentDidMount() {
    const { id } = this.props.navigation.getParam('product')
    axios.get(`${hostName}/api/v1/offer/${id}`)
      .then((res) => {
        this.setState({item: transformProduct(res.data), isLoading: false })
      })
      .catch(() => {
        this.setState({ isLoading: false })
      })
  }
  render() {
    const { isLoading, item } = this.state
    if (isLoading === true) {
      return (<Loader animating={!isLoading} />)
    }
    return (
      <View style={[styles.container]}>
        <View>
          <View style={styles.imgView}>
            <FastImage
              style={{ height: 150, width: w - 50 }} 
              source={item.img}
              resizeMode={FastImage.resizeMode.cover}
            />
          </View>
          <View style={styles.bodyView}>
            <View style={{flexDirection: 'row'}}>
              <View style={{flex: 1}}><Text style={styles.itemTitle} >{item.title}</Text></View>
              <View><Ionicons name="md-heart-empty" size={25} color="#FF798D" /></View>
            </View>
            <View><Text style={styles.itemPriceText}>340 тг</Text></View>
            <View><Button title="В корзину" icon="cart" onPress={() => {}} /></View>
          </View>
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({ 
  itemTitle: {    
    fontFamily: 'CenturyGothic',
    fontSize: 14,
    color: 'black'
  },
  itemPriceText: {
    fontFamily: 'CenturyGothic',
    fontSize: 14,
    color: '#FF798D'  
  },
  container: {
    flex: 1,
    justifyContent: 'flex-start'
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
