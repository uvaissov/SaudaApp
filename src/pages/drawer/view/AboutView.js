import React, {Component} from 'react'
import { StyleSheet, Text, View } from 'react-native'
import FastImage from 'react-native-fast-image'
import HTML from 'react-native-render-html'
import Entypo from 'react-native-vector-icons/Entypo'
import { w, FONT, normalize, GREEN } from '../../../constants/global'

class AboutView extends Component {
  state = {
    showTotal: false
  }
  
  render() {
    const { item } = this.props
    //title, payment_type, salary, employment_type
    return (
      <View style={[styles.container]}>
        <Text style={[styles.word, {marginBottom: 10, fontSize: normalize(16), textTransform: 'uppercase'}]}>{item.title}</Text>
        <HTML allowedStyles={['color']} baseFontStyle={styles.itemDescFull} html={item.content} imagesMaxWidth={w} tagsStyles={propsStyle.tagsStyles} classesStyles={propsStyle.classesStyles} listsPrefixesRenderers={propsStyle.listRenders} renderers={propsStyle.renders} />
        <View style={{alignItems: 'center'}}>
          <FastImage
            style={[styles.image]}
            source={require('../../../../resources/images/img/about.jpeg')}
            resizeMode={FastImage.resizeMode.contain}
          />
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({ 
  container: {
    padding: 20,
    marginBottom: 20,
    marginHorizontal: 5,
    borderWidth: 0
  },
  word: {
    fontFamily: FONT
  },
  shadow: {
    shadowColor: 'rgba(0, 0, 0, 1)',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 8,
    position: 'relative'
  },
  itemDescFull: {    
    fontFamily: 'CenturyGothic',
    fontSize: 14,
    color: 'rgba(0,0,0,0.8)'
  },
  image: {
    width: w,
    height: 250,
    marginHorizontal: 5,
    marginVertical: 10,
    borderRadius: 30
  }
})

const propsStyle = {
  renders: {
    ul1: (htmlAttribs, children) => {
      return (<View style={{ width: '100%' }} >
        {
          children.map((item) => {
            return (<View style={{backgroundColor: 'red'}}>
              <Entypo color={GREEN} name="dot-single" size={23} />
            {item}
            </View>)
          })}
      </View>)
    }
    
  },
  listRenders: {
    ul: (htmlAttribs, children, convertedCSSStyles, passProps) => {
      return (
        <Entypo color={GREEN} name="dot-single" size={23} />
      )
    }
  },
  tagsStyles: { ul: { margin: 0, padding: 0 } },
  classesStyles: { 
    'text-style': { fontWeight: '800' }, 
    'text-center': { textAlign: 'center', alignItems: 'center' },
    row: { flexDirection: 'row', justifyContent: 'space-around' }
  }
}

export default AboutView 
