import React, {Component} from 'react'
//import _ from 'lodash'
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native'
import { } from '../../../constants/global'

class ItemFooter extends Component {
  render() {
    return (
      <View style={[styles.container]}>
        <View><Text>Footer</Text></View>
        <View><Text>Footer</Text></View>
        <View><Text>Footer</Text></View>        
      </View>
    )
  }
}

const styles = StyleSheet.create({ 
  container: {
    flexDirection: 'row',
    justifyContent: 'center'
  }
})

export default ItemFooter
