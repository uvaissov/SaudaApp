import React from 'react'
import { Text, View, StyleSheet, TouchableOpacity, Linking } from 'react-native'
import FastImage from 'react-native-fast-image'
import Share from 'react-native-share'
import { WHITE, GREEN, FONT, normalize, BLACK, hostName } from '../constants/global'

const SocialLinks = () => {
  this.shareApp = (social) => {
    const shareOptions = {
      title: 'Dosta-market',
      message: 'Советую',
      url: hostName,
      social
    }
    Share.shareSingle(shareOptions)
  }
  this.shareVk = () => {
    let url = `http://vk.com/share.php?url=${hostName}`
    url += '&noparse=true'
    Linking.openURL(url)
  }

  return (
    <View style={{justifyContent: 'flex-end'}}>
      <Text style={styles.shareText}>Поделиться</Text>
      <View style={[styles.view]}>
        <TouchableOpacity onPress={() => { this.shareVk() }}>
          <View style={[styles.buttonBox]}>
            <FastImage
              style={[styles.image, styles.shadow]}
              source={require('../../resources/images/icons/social/vk.png')}
              resizeMode={FastImage.resizeMode.contain}
            />
          </View>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => { this.shareApp(Share.Social.INSTAGRAM) }}>
          <View style={[styles.buttonBox]}>
            <FastImage
              style={[styles.image, styles.shadow]}
              source={require('../../resources/images/icons/social/ig.png')}
              resizeMode={FastImage.resizeMode.contain}
            />
          </View>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => { this.shareApp(Share.Social.WHATSAPP) }}>
          <View style={[styles.buttonBox]}>
            <FastImage
              style={[styles.image, styles.shadow]}
              source={require('../../resources/images/icons/social/wa.png')}
              resizeMode={FastImage.resizeMode.contain}
            />
          </View>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => { this.shareApp(Share.Social.FACEBOOK) }}>
          <View style={[styles.buttonBox]}>
            <FastImage
              style={[styles.image, styles.shadow]}
              source={require('../../resources/images/icons/social/fb.png')}
              resizeMode={FastImage.resizeMode.contain}
            />
          </View>
        </TouchableOpacity>
      </View>
    </View>
  )
}
const styles = StyleSheet.create({
  view: {
    backgroundColor: WHITE,
    flexDirection: 'row',
    alignItems: 'flex-end',
    paddingTop: 5,
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
  shareText: {
    fontFamily: FONT,
    fontSize: normalize(15),
    color: BLACK,
    marginHorizontal: 20
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

export { SocialLinks }
