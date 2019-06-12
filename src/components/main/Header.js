import React, {Component} from 'react'
import { StyleSheet, View, TouchableOpacity, TextInput } from 'react-native'
import { FastImage } from 'react-native-fast-image'

export default class Header extends Component {
  render() {
    const { onPress } = this.props
    return (
      <View style={[styles.container, styles.shadow]}>
        <View style={styles.headerView}>
          <TouchableOpacity onPress={onPress}>          
            <FastImage
              style={styles.image}
              source={require('../../../resources/images/icons/header/menu.png')}
              resizeMode={FastImage.resizeMode.contain}
            />
          </TouchableOpacity>
          <View style={styles.textView}>
            <TextInput style={[styles.textInput]} placeholder="Введите название продукта" />
            <FastImage
              style={styles.image}
              source={require('../../../resources/images/icons/header/search.png')}
              resizeMode={FastImage.resizeMode.contain}
            />
          </View>
          <FastImage
            style={styles.image}
            source={require('../../../resources/images/icons/header/location.png')}
            resizeMode={FastImage.resizeMode.contain}
          />
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  image: {
    height: 50,
    width: 50
  },
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
