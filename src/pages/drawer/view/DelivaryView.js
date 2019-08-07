import React, {Component} from 'react'
import { StyleSheet, View } from 'react-native'
import HTML from 'react-native-render-html'
import Entypo from 'react-native-vector-icons/Entypo'
import { w, FONT, BLACK, GREEN } from '../../../constants/global'

class DelivaryView extends Component {
  state = {
    showTotal: false
  }
  
  render() {
    const { item } = this.props
    return (
      <View style={[styles.container]}>
        <HTML allowedStyles={['color']} baseFontStyle={styles.itemDescFull} html={item.content} imagesMaxWidth={w} tagsStyles={propsStyle.tagsStyles} classesStyles={propsStyle.classesStyles} listsPrefixesRenderers={propsStyle.listRenders} />
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
  listRenders: {
    ul: (htmlAttribs, children, convertedCSSStyles, passProps) => {
      return (
        <Entypo color={GREEN} name="dot-single" size={23} />
      )
    }
  },
  tagsStyles: { img: { alignSelf: 'center'} },
  classesStyles: { 
    'text-style': { fontWeight: '800' }, 
    'text-center': { textAlign: 'center', alignItems: 'center' },
    row: { flexDirection: 'row', justifyContent: 'space-around' }
  }
}

export default DelivaryView 
