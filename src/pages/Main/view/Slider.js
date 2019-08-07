import React from 'react'
import { View, StyleSheet, TouchableWithoutFeedback, Text } from 'react-native'
import FastImage from 'react-native-fast-image'
import Swiper from 'react-native-swiper'
import _ from 'lodash'
import { w, GREEN, normalize } from '../../../constants/global'

const getComponentHeight = (weight) => {
  return weight
}

const SliderApp = ({
  data,
  buttons
}) => {
  const { child, childBtn } = styles
  this._renderSwiper = () => (
    <View style={{paddingHorizontal: 0}}>
      <Swiper paginationStyle={{ marginHorizontal: 15}} key={data.length} height={getComponentHeight(w, 30) + 10} autoplay autoplayTimeout={3.5} activeDotColor="green" dotColor="black" >
        {
          data.map((item) => {
            return (
              <TouchableWithoutFeedback key={item.id} onPress={() => {}}>
                <View key={item.id} style={[child, { width: w }]}>      
                  <FastImage  
                    style={{ flex: 1, height: undefined, width: undefined }} 
                    source={item.img}
                    resizeMode={FastImage.resizeMode.cover}
                  />                           
                </View>
              </TouchableWithoutFeedback>
            )
          }
          )
        }
      </Swiper>
    </View>
  )
  this._renderSwiperBtn = () => (
    <View style={{paddingHorizontal: 0}}>
      <Swiper 
        showsButtons 
        showsPagination={false} 
        key={data.length} 
        height={100} 
        autoplay 
        autoplayTimeout={3.5} 
        nextButton={(<Text style={styles.buttonText}>›</Text>)}
        prevButton={(<Text style={styles.buttonText}>‹</Text>)}
      >
        {
          data.map((item) => {
            return (
              <TouchableWithoutFeedback key={item.id} onPress={() => {}}>
                <View key={item.id} style={[childBtn, { width: w }]}>      
                  <FastImage  
                    style={{ height: 100, width: 150 }} 
                    //width={150}
                    source={item.img}
                    resizeMode={FastImage.resizeMode.contain}
                  />                           
                </View>
              </TouchableWithoutFeedback>
            )
          }
          )
        }
      </Swiper>
    </View>
  )
  if (_.isEmpty(data)) {
    return null
  }
  if (buttons) {
    return this._renderSwiperBtn()
  }

  return this._renderSwiper()
}

const styles = StyleSheet.create({
  child: {
    height: getComponentHeight(w, 30),
    justifyContent: 'center'
    //alignItems: 'center'
  },
  childBtn: {
    height: 100,
    justifyContent: 'center',
    alignItems: 'center'
  },
  text: {
    fontSize: w * 0.5,
    textAlign: 'center'
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'stretch',
    backgroundColor: 'transparent'
  },
  shadow: {
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.3,
    shadowRadius: 1.22,
    shadowColor: 'black',
    elevation: 4,
    borderColor: '#000'
  },
  buttonText: {
    color: GREEN,
    fontSize: normalize(40)
  }
})

export default SliderApp
