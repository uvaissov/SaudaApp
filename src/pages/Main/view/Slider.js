import React from 'react'
import { View, StyleSheet, TouchableWithoutFeedback } from 'react-native'
import FastImage from 'react-native-fast-image'
import Swiper from 'react-native-swiper'
import { w } from '../../../constants/global'

const getComponentHeight = (weight) => {
  return weight
}

const SliderApp = ({
  data,
  navigation
}) => {
  const { child } = styles
  this._renderSwiper = () => (
    <View style={{paddingHorizontal: 0}}>
      <Swiper paginationStyle={{ marginHorizontal: 15}} key={data.length} height={getComponentHeight(w, 30) + 10} autoplay autoplayTimeout={3.5} activeDotColor="green" dotColor="black" >
        {
          data.map((item) => {
            return (
              <TouchableWithoutFeedback key={item.id} onPress={() => navigation.navigate('Item', {id: item.id })}>
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
  return this._renderSwiper()
}

const styles = StyleSheet.create({
  child: {
    height: getComponentHeight(w),
    justifyContent: 'center'
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
  }
})

export default SliderApp
