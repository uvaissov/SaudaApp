import React from 'react'
import { Text, View, StyleSheet, TouchableOpacity } from 'react-native'
import FastImage from 'react-native-fast-image'
import { WHITE, GREEN, FONT, normalize } from '../../../constants/global'

const HeaderButtonDelivery = ({selected, style, onPress}) => {  
  this.renderButtonCar = () => {
    if (selected === 0) {
      return (
        <View style={styles.selectedBox}>
          <FastImage
            style={[styles.image]}
            source={require('../../../../resources/images/icons/delivery/car.png')}
            resizeMode={FastImage.resizeMode.contain}
          />
          <Text style={styles.word}>Доставка</Text>
        </View>)
    }
    return (
      <TouchableOpacity onPress={() => { onPress(0) }}>
        <View style={styles.buttonBox}>
          <FastImage
            style={[styles.image, styles.shadow]}
            source={require('../../../../resources/images/icons/delivery/car.png')}
            resizeMode={FastImage.resizeMode.contain}
          />
        </View>
      </TouchableOpacity>)
  }
  this.renderButtonPay = () => {
    if (selected === 1) {
      return (
        <View style={styles.selectedBox}>
          <FastImage
            style={[styles.image]}
            source={require('../../../../resources/images/icons/delivery/pay.png')}
            resizeMode={FastImage.resizeMode.contain}
          />
          <Text style={styles.word}>Оплата</Text>
        </View>)
    }
    return (
      <TouchableOpacity onPress={() => { onPress(1) }}>
        <View style={styles.buttonBox}>
          <FastImage
            style={[styles.image, styles.shadow]}
            source={require('../../../../resources/images/icons/delivery/pay.png')}
            resizeMode={FastImage.resizeMode.contain}
          />
        </View>
      </TouchableOpacity>)
  }
  this.renderButtonStar = () => {
    if (selected === 2) {
      return (
        <View style={styles.selectedBox}>
          <FastImage
            style={[styles.image]}
            source={require('../../../../resources/images/icons/delivery/fav.png')}
            resizeMode={FastImage.resizeMode.contain}
          />
          <Text style={styles.word}>Качество</Text>
        </View>)
    }
    return (
      <TouchableOpacity onPress={() => { onPress(2) }}>
        <View style={[styles.buttonBox]}>
          <FastImage
            style={[styles.image, styles.shadow]}
            source={require('../../../../resources/images/icons/delivery/fav.png')}
            resizeMode={FastImage.resizeMode.contain}
          />
        </View>
      </TouchableOpacity>
    )
  }

  this.renderButtonBox = () => {
    if (selected === 3) {
      return (
        <View style={styles.selectedBox}>
          <FastImage
            style={[styles.image]}
            source={require('../../../../resources/images/icons/delivery/box.png')}
            resizeMode={FastImage.resizeMode.contain}
          />
          <Text style={styles.word}>Возврат товара</Text>
        </View>)
    }
    return (
      <TouchableOpacity onPress={() => { onPress(3) }}>
        <View style={[styles.buttonBox]}>
          <FastImage
            style={[styles.image, styles.shadow]}
            source={require('../../../../resources/images/icons/delivery/box.png')}
            resizeMode={FastImage.resizeMode.contain}
          />
        </View>
      </TouchableOpacity>
    )
  }

  return (
    <View style={[styles.view, style]}>
      {this.renderButtonCar()}
      {this.renderButtonPay()}
      {this.renderButtonStar()}
      {this.renderButtonBox()}
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

export { HeaderButtonDelivery }
