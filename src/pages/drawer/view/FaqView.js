import React, {Component} from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { w, FONT, GREEN, normalize } from '../../../constants/global'

class FaqView extends Component {
  state = {
    showTotal: false
  }

  render() {
    const { item } = this.props
    return (
      <View style={[styles.container, styles.shadow]}>
        <Text style={[styles.word, {marginBottom: 5, color: GREEN, fontSize: normalize(16)}]}>{item.question}</Text>
        <Text style={[styles.word, {marginBottom: 5}]}>{item.answer}</Text>
      </View>
    )
  }
}

const styles = StyleSheet.create({ 
  container: {
    width: w - 50,
    backgroundColor: 'white',
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
  }
})

export default FaqView 
