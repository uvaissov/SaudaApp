import React, {Component} from 'react'
import { StyleSheet, View, TouchableOpacity } from 'react-native'
import Ionicons from 'react-native-vector-icons/Ionicons'
import { TextInput } from 'react-native-gesture-handler'

export default class Header extends Component {
  render() {
    const { onPress } = this.props
    return (
      <View style={styles.container}>
        <View style={styles.headerView}>
          <TouchableOpacity onPress={onPress}>          
            <Ionicons name="ios-menu" size={20} fill="#000" />
          </TouchableOpacity>
          <View style={styles.textView}>
            <TextInput style={styles.textInput} placeholder="Введите название продукта" />
            <Ionicons name="ios-search" size={20} fill="#000" />
          </View>
          <Ionicons name="ios-home" size={20} fill="#000" />
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    height: 90,
    justifyContent: 'flex-start'
  },
  headerView: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center'
  },
  textView: {
    flex: 1,
    flexDirection: 'row',
    borderRadius: 15,
    borderWidth: 1,
    borderColor: 'green',
    height: 30
  },
  textInput: {
    flex: 1
  }
})
