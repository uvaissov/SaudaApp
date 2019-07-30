import React, {Component} from 'react'
import { StyleSheet, Text, View } from 'react-native'
import HTML from 'react-native-render-html'
import { w, FONT, normalize } from '../../../constants/global'

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
        <HTML allowedStyles={['color']} baseFontStyle={styles.itemDescFull} html={item.content} imagesMaxWidth={w} />
      </View>
    )
  }
}

const styles = StyleSheet.create({ 
  container: {
    //width: w - 50,
    //backgroundColor: 'white',
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
  }
})

export default AboutView 
