import React, {Component} from 'react'
import _ from 'lodash'
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native'
import { FONT, normalize, GREEN, WHITE } from '../../../constants/global'

class ItemFooter extends Component {
  render() {
    const { current_page, last_page, elementCount, onPagePress } = this.props
    //console.log(current_page, last_page, elementCount)
    if (!current_page || !last_page) {
      return null
    }
    const range = Math.ceil(current_page / elementCount)
    const min = (range * elementCount) - (elementCount - 1)
    let max = (range * elementCount)
    if (max >= last_page) {
      max = last_page
    }
    if (max < 2) {
      return null
    }
    const leftArrow = min > 1
    const rifhtArrow = last_page > max
    const array = _.range(min, max + 1)
    return (
      <View style={[styles.container]}>
        {
          leftArrow &&
          <TouchableOpacity onPress={() => onPagePress(min - 1)}>
            <View style={[styles.box]}><Text style={[styles.word, {fontSize: normalize(11)}]}>{'{{'}</Text></View>
          </TouchableOpacity>
        }
        {
          array.map((item) => {
            if (item === current_page) {
              return (<View style={[styles.box, styles.boxSelected]}><Text style={[styles.word, styles.wordSelected]}>{item}</Text></View>)
            }
            
            return (<TouchableOpacity onPress={() => onPagePress(item)}><View style={[styles.box]}><Text style={[styles.word]}>{item}</Text></View></TouchableOpacity>)
          })
        }
        {
          rifhtArrow &&
          <TouchableOpacity onPress={() => onPagePress(max + 1)}>
            <View style={[styles.box]}><Text style={[styles.word, {fontSize: normalize(11)}]}>{'}}'}</Text></View>
          </TouchableOpacity>
        }      
      </View>
    )
  }
}

const styles = StyleSheet.create({ 
  container: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 15
  },
  word: {
    fontFamily: FONT,
    fontSize: normalize(16),
    color: GREEN
  },
  wordSelected: {
    color: WHITE 
  },
  box: {
    borderRadius: 50,
    height: 55,
    width: 55,
    justifyContent: 'center',
    alignItems: 'center'
  },
  boxSelected: {    
    backgroundColor: GREEN
  }
})

export default ItemFooter
