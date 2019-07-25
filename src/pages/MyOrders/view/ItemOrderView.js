import React, {Component} from 'react'
import _ from 'lodash'
import { StyleSheet, Text, View } from 'react-native'
import EvilIcons from 'react-native-vector-icons/EvilIcons'
import { normalize, GREEN, FONT, BLACK } from '../../../constants/global'

class ItemFavView extends Component {
  renderStatus = (status) => {
    if (status === 'В обработке') {
      return (<EvilIcons name="clock" size={25} color={GREEN} />)
    }
    return null
  }
  renderDate = (date) => {    
    return date
  }
  renderProducts = (products) => {
    let text = ''
    _.forEach(products, ({title}) => {
      text += `${title}\n\n`    
    })
    return (<Text style={[styles.wordDate, {marginRight: 5}]}>{text}</Text>)
  }

  render() {
    const { item } = this.props
    return (
      <View style={[styles.container]}>
        <View style={{ flex: 5, alignSelf: 'stretch' }} >{this.renderProducts(item.products)}</View>
        <View style={{ flex: 3, alignSelf: 'stretch' }} ><Text style={styles.wordDate}>{item.date}</Text></View>
        <View style={{ flex: 1, alignSelf: 'stretch', alignItems: 'center' }} >{this.renderStatus(item.status)}</View>
        <View style={{ flex: 3, alignSelf: 'stretch', alignItems: 'center' }} ><Text style={styles.wordDate}>{item.total} тг</Text></View>
      </View>
    )
  }
}

const styles = StyleSheet.create({ 
  container: {
    flex: 1, alignSelf: 'stretch', flexDirection: 'row', marginHorizontal: 5, paddingHorizontal: 5, paddingVertical: 15, borderBottomWidth: 1, borderColor: 'rgba(0,0,0,0.1)'
  },
  wordDate: {
    fontFamily: FONT,
    fontSize: normalize(12),
    color: BLACK
  }
})

export default ItemFavView
