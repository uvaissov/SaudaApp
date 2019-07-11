import React, {Component} from 'react'
import { StyleSheet, Text, View } from 'react-native'
import Ionicons from 'react-native-vector-icons/Ionicons'
import FastImage from 'react-native-fast-image'
import { w } from '../../../constants/global'
import { Button } from './Button'

class ItemView extends Component {
  state={
    loginShow: false
  }
  render() {
    const { item } = this.props
    return (
      <View style={[styles.container, styles.shadow]}>
        <View style={styles.rowContainer}>
          <View style={styles.imgView}>
            <FastImage
              style={{ height: 90, width: 70 }} 
              source={item.img}
              resizeMode={FastImage.resizeMode.contain}
            />
          </View>
          <View style={styles.bodyView}>
            <View style={{flexDirection: 'row'}}>
              <View style={{flex: 1}}><Text style={styles.itemTitle} >{item.title}</Text></View>
              <View><Ionicons name="md-heart-empty" size={25} color="#FF798D" /></View>
            </View>
            <View><Text style={styles.itemPriceText}>340 тг</Text></View>
            <View><Button title="В корзину" onPress={() => {}} /></View>
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
    width: w - 50,
    marginHorizontal: 25,
    backgroundColor: 'white',
    padding: 20,
    marginBottom: 20
  },
  rowContainer: {
    flex: 1,
    flexDirection: 'row'
  },
  imgView: {
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 20
  },
  bodyView: {
    flex: 1,
    justifyContent: 'space-between'
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
export default ItemView
