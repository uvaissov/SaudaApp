import React, {Component} from 'react'
import { StyleSheet, Text, View } from 'react-native'
import Ionicons from 'react-native-vector-icons/Ionicons'
import EvilIcons from 'react-native-vector-icons/EvilIcons'
import IconSvg from '../../../components/IconSvg'
import { w, normalize, GREEN, FONT } from '../../../constants/global'

class OrderHeaderView extends Component {
  render() {
    return (
      <View style={[styles.container]}>
        <View style={{ flex: 5, alignSelf: 'stretch', justifyContent: 'center' }} ><Text style={styles.word}>Заказ</Text></View>
        <View style={{ flex: 3, alignSelf: 'stretch', justifyContent: 'center', alignItems: 'center' }} ><EvilIcons name="clock" size={25} color={GREEN} /></View>
        <View style={{ flex: 1, alignSelf: 'stretch', justifyContent: 'center', alignItems: 'center' }} ><Ionicons name="ios-information-circle-outline" size={22} color={GREEN} /></View>
        <View style={{ flex: 3, alignSelf: 'stretch', justifyContent: 'center', alignItems: 'center' }} ><IconSvg name="Coin" size={22} height="20" width="20" fill={GREEN} /></View>
      </View>
    )
  }
}

const styles = StyleSheet.create({ 
  container: {
    flex: 1, alignSelf: 'stretch', flexDirection: 'row', marginHorizontal: 5, paddingHorizontal: 5, paddingVertical: 15, borderBottomWidth: 1, borderColor: 'rgba(0,0,0,0.1)'
  },
  word: {
    fontFamily: FONT,
    fontSize: normalize(13),
    color: GREEN
  }
})

export default OrderHeaderView
