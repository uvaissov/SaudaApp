import React from 'react'
import { Text, View, StyleSheet, TouchableOpacity } from 'react-native'
import FastImage from 'react-native-fast-image'
import { WHITE, GREEN, FONT, normalize } from '../../../constants/global'

const HeaderButtonContainer = ({selected, navigation, style, token, showLogin}) => {  
  this.renderButtonProfile = () => {
    if (selected === 'profile') {
      return (
        <View style={styles.selectedBox}>
          <FastImage
            style={[styles.image]}
            source={require('../../../../resources/images/icons/footer/profile.png')}
            resizeMode={FastImage.resizeMode.contain}
          />
          <Text style={styles.word}>Личные данные</Text>
        </View>)
    }
    return (
      <TouchableOpacity onPress={() => { if (token) { navigation.navigate('Profile') } else showLogin() }}>
        <View style={styles.buttonBox}>
          <FastImage
            style={[styles.image, styles.shadow]}
            source={require('../../../../resources/images/icons/profile/profile.png')}
            resizeMode={FastImage.resizeMode.contain}
          />
        </View>
      </TouchableOpacity>)
  }
  this.renderButtonCard = () => {
    if (selected === 'orders') {
      return (
        <View style={styles.selectedBox}>
          <FastImage
            style={[styles.image]}
            source={require('../../../../resources/images/icons/footer/basket.png')}
            resizeMode={FastImage.resizeMode.contain}
          />
          <Text style={styles.word}>Мои заказы</Text>
        </View>)
    }
    return (
      <TouchableOpacity onPress={() => { if (token) { navigation.navigate('MyOrders') } else showLogin() }}>
        <View style={styles.buttonBox}>
          <FastImage
            style={[styles.image, styles.shadow]}
            source={require('../../../../resources/images/icons/profile/card.png')}
            resizeMode={FastImage.resizeMode.contain}
          />
        </View>
      </TouchableOpacity>)
  }
  this.renderButtonFavorite = () => {
    if (selected === 'favorite') {
      return (
        <View style={styles.selectedBox}>
          <FastImage
            style={[styles.image]}
            source={require('../../../../resources/images/icons/footer/favorite.png')}
            resizeMode={FastImage.resizeMode.contain}
          />
          <Text style={styles.word}>Избранное</Text>
        </View>)
    }
    return (
      <TouchableOpacity onPress={() => { if (token) { navigation.navigate('Favorite') } else showLogin() }}>
        <View style={[styles.buttonBox]}>
          <FastImage
            style={[styles.image, styles.shadow]}
            source={require('../../../../resources/images/icons/profile/favorite.png')}
            resizeMode={FastImage.resizeMode.contain}
          />
        </View>
      </TouchableOpacity>
    )
  }

  return (
    <View style={[styles.view, style]}>
      {this.renderButtonProfile()}
      {this.renderButtonCard()}
      {this.renderButtonFavorite()}
    </View>
  )
}
const styles = StyleSheet.create({
  view: {
    backgroundColor: WHITE,
    flexDirection: 'row',
    alignItems: 'flex-end',
    paddingTop: 15,
    paddingHorizontal: 1
  },
  image: {
    width: 45,
    height: 45,
    marginHorizontal: 5,
    marginVertical: 10,
    backgroundColor: GREEN,
    borderRadius: 30
  },
  word: {
    fontFamily: FONT,
    fontSize: normalize(15),
    color: WHITE
  },
  buttonBox: {
    marginHorizontal: 10
  },
  selectedBox: {
    flex: 1, 
    flexDirection: 'row', 
    alignItems: 'center', 
    backgroundColor: GREEN, 
    borderTopRightRadius: 30, 
    borderTopLeftRadius: 30,
    justifyContent: 'space-around',
    paddingRight: 5
  },
  shadow: {
    shadowColor: 'black',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 16,
    elevation: 6,
    position: 'relative'
  }
})

export { HeaderButtonContainer }
