import React, {Component} from 'react'
import { StyleSheet, View } from 'react-native'
import HTML from 'react-native-render-html'
import { w, FONT, BLACK } from '../../../constants/global'

class DelivaryView extends Component {
  state = {
    showTotal: false
  }
  
  render() {
    const { item } = this.props
    return (
      <View style={[styles.container]}>
        <HTML allowedStyles={['color']} baseFontStyle={styles.itemDescFull} html={item.content} imagesMaxWidth={w} tagsStyles={propsStyle.tagsStyles} classesStyles={propsStyle.classesStyles} />
      </View>
    )
  }
}

const styles = StyleSheet.create({ 
  container: {    
    padding: 20,
    marginBottom: 20,
    //marginHorizontal: 5,
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
    color: BLACK
  }
})

const propsStyle = {
  tagsStyles: { },
  classesStyles: { 'text-style': { fontWeight: '800' } }
}

export default DelivaryView 
