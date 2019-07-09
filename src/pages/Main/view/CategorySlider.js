import React from 'react'
import { View, StyleSheet, TouchableOpacity, ScrollView, Text } from 'react-native'
import FastImage from 'react-native-fast-image'
//import { w } from '../../../constants/global'

const CategorySlider = ({
  data,
  navigation
}) => {
  const { child, text, container } = styles
  this._renderSwiper = () => (
    <View style={container}>
      <ScrollView horizontal showsHorizontalScrollIndicator={false} >
        {
          data.map((item) => {
            return (
              <TouchableOpacity key={item.id} onPress={() => navigation.navigate('Catalog')}>
                <View key={item.id} style={[child]}>      
                  <FastImage
                    style={{ height: 70, width: 70 }} 
                    source={item.img}
                    resizeMode={FastImage.resizeMode.contain}
                  />
                  <Text style={text} >{item.name}</Text>                      
                </View>
              </TouchableOpacity>
            )
          }
          )
        }
      </ScrollView>
    </View>
  )  
  return this._renderSwiper()
}

const styles = StyleSheet.create({
  child: {
    height: 100,
    width: 80,
    alignItems: 'center',
    marginHorizontal: 5
  },
  text: {
    fontSize: 12,
    fontFamily: 'CenturyGothic',
    textAlign: 'center'
  },
  container: {
    //flex: 1,
    marginVertical: 15
  }
})

export default CategorySlider
