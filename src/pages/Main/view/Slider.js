import React from 'react'
import { View, StyleSheet, TouchableWithoutFeedback, Text, TouchableOpacity } from 'react-native'
import FastImage from 'react-native-fast-image'
import Swiper from 'react-native-swiper'
import _ from 'lodash'
import { w, GREEN, normalize, BLACK, WHITE, RED } from '../../../constants/global'

const getComponentHeight = (weight) => {
  return weight * 0.8
}

const SliderApp = ({
  data,
  buttons,
  navigation
}) => {
  const { child, childBtn } = styles
  this._renderSwiperStatic = () => {    
    return (
      <View style={{paddingHorizontal: 0}}>
        <Swiper paginationStyle={{ marginHorizontal: 15}} key={data.length} height={getComponentHeight(w, 30) + 10} autoplay autoplayTimeout={3.5} activeDotColor="green" dotColor="black" >
          <TouchableWithoutFeedback key="slidert1" onPress={() => {}}>
            <View key="slider1" style={[child, { width: w }]}>      
              <FastImage  
                style={{ flex: 1, height: undefined, width: undefined, justifyContent: 'center', alignItems: 'center' }} 
                source={require('../../../../resources/images/img/slider/mob-slider-1.png')}
                resizeMode={FastImage.resizeMode.cover}
              >  
                <Text style={[styles.dostaText, {color: GREEN}]}>dosta market</Text>
                <Text style={{color: BLACK}}>Lorem ipsum dolor sit amet, consectetur.</Text>
                <Text style={{color: BLACK}}>Lorem ipsum dolor sit amet, consectetur adipisicing.</Text>
                <Text style={{color: BLACK}}>Lorem ipsum dolor sit amet, consectetur.</Text>                
              </FastImage>                           
            </View>
          </TouchableWithoutFeedback>
          <TouchableWithoutFeedback key="slidert1" onPress={() => {}}>
            <View key="slider1" style={[child, { width: w }]}>      
              <FastImage  
                style={{ flex: 1, height: undefined, width: undefined, justifyContent: 'center', alignItems: 'center' }} 
                source={require('../../../../resources/images/img/slider/mob-slider-2.png')}
                resizeMode={FastImage.resizeMode.cover}
              > 
                <Text style={[styles.dostaText, {color: RED}]}>dosta market</Text>
                <Text style={{color: BLACK, textAlign: 'center', paddingHorizontal: 25}}>Молочная продукция изготавливается исключительно из натурального высококачественного коровьего молока, без добавления консервантов и ГМО.</Text> 
                <TouchableOpacity onPress={() => navigation.navigate('Catalog')}>
                  <View style={{width: 200, borderRadius: 25, height: 40, justifyContent: 'center', alignItems: 'center', backgroundColor: WHITE, marginTop: 20}}>
                    <Text style={{color: '#37616e'}}>Смотреть продукты</Text>
                  </View>
                </TouchableOpacity>
              </FastImage>                           
            </View>
          </TouchableWithoutFeedback>
          <TouchableWithoutFeedback key="slidert1" onPress={() => {}}>
            <View key="slider1" style={[child, { width: w }]}>      
              <FastImage  
                style={{ flex: 1, height: undefined, width: undefined, justifyContent: 'center', alignItems: 'center' }} 
                source={require('../../../../resources/images/img/slider/mob-slider-3.png')}
                resizeMode={FastImage.resizeMode.cover}
              > 
                <Text style={[styles.dostaText, {color: GREEN}]}>dosta market</Text>
                <Text style={{color: BLACK, textAlign: 'center', paddingHorizontal: 25}}>Установи приложение и получай кэшбэк до 20% в заведениях твоего города</Text>
              </FastImage>                           
            </View>
          </TouchableWithoutFeedback>
          <TouchableWithoutFeedback key="slidert1" onPress={() => {}}>
            <View key="slider1" style={[child, { width: w }]}>      
              <FastImage  
                style={{ flex: 1, height: undefined, width: undefined, justifyContent: 'center', alignItems: 'center' }} 
                source={require('../../../../resources/images/img/slider/mob-slider-4.png')}
                resizeMode={FastImage.resizeMode.cover}
              > 
                <Text style={[styles.dostaText, {color: '#542e13'}]}>dosta market</Text>
                <Text style={{color: BLACK, textAlign: 'center', paddingHorizontal: 25}}>Соблюдение качества – это хороший знак. Мы усилили контроль качества.</Text> 
                <TouchableOpacity onPress={() => navigation.navigate('Catalog')}>
                  <View style={{width: 200, borderRadius: 25, height: 40, justifyContent: 'center', alignItems: 'center', backgroundColor: '#e0a800', marginTop: 20}}>
                    <Text style={{color: WHITE}}>Смотреть продукты</Text>
                  </View>
                </TouchableOpacity>
              </FastImage>                           
            </View>
          </TouchableWithoutFeedback>
        </Swiper>
      </View>
    )
  }
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
    <View style={{marginVertical: 20}}>
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

  return this._renderSwiperStatic()
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
  dostaText: {
    fontFamily: 'ElowenCaps',
    fontSize: normalize(30),
    textAlign: 'center',
    textTransform: 'uppercase'
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
