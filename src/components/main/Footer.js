import React, {Component} from 'react'
import { StyleSheet, View, TouchableOpacity } from 'react-native'
import Ionicons from 'react-native-vector-icons/Ionicons'
import { TextInput } from 'react-native-gesture-handler'

export default class Footer extends Component {
  render() {
    const { onPress } = this.props
    return (
      <View style={[styles.container, styles.shadow]}>
        <View style={styles.headerView}>
          <TouchableOpacity onPress={onPress}>          
            <Ionicons name="md-menu" size={40} color="#67cf70" />
          </TouchableOpacity>
          <View style={styles.textView}>
            <TextInput style={[styles.textInput]} placeholder="Введите название продукта" />
            <Ionicons name="ios-search" size={20} color="#67cf70" />
          </View>
          <Ionicons name="ios-home" size={40} color="#67cf70" />
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    height: 60,
    justifyContent: 'flex-end',
    backgroundColor: '#fff',
    paddingHorizontal: 20
  },
  shadow: {
    shadowColor: 'rgba(0, 0, 0, 0.1)',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 16,
    elevation: 8,
    position: 'relative'

  },
  headerView: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    marginBottom: 10
  },
  textView: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 15,
    borderWidth: 1,
    borderColor: '#67cf70',
    marginHorizontal: 20,
    paddingHorizontal: 10
  },
  textInput: {
    flex: 1,
    paddingVertical: 0,
    fontSize: 14,
    height: 30    
  }
})
