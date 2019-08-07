import React, {Component} from 'react'
import { StyleSheet, Text, View, TouchableWithoutFeedback} from 'react-native'
import ReadMore from 'react-native-read-more-text'
import LinearGradient from 'react-native-linear-gradient'
import { w, FONT, GREEN, normalize, WHITE, RED } from '../../../constants/global'

class FaqView extends Component {
  state = {
    showTotal: false
  }

  _handleTextReady = () => {
    const { item } = this.props
    console.log(`read: ${item.question}`)
  }

  _renderTruncatedFooter = (handlePress) => {
    return (
      <TouchableWithoutFeedback onPress={handlePress}>
        <LinearGradient colors={['#ffffff00', WHITE, WHITE]} style={{bottom: 0}} >
          <Text style={{color: GREEN, marginTop: 5, textDecorationLine: 'underline'}} >
        Читать дальше
          </Text>
        </LinearGradient>
      </TouchableWithoutFeedback>
    )
  }

  _renderRevealedFooter = (handlePress) => {
    return (
      <TouchableWithoutFeedback onPress={handlePress}>
        <Text style={{color: RED, marginTop: 5}} onPress={handlePress}>
          Скрыть
        </Text>
      </TouchableWithoutFeedback>
    )
  }

  render() {
    const { item } = this.props
    return (
      <View style={[styles.container, styles.shadow]}>
        <Text style={[styles.word, {marginBottom: 5, color: GREEN, fontSize: normalize(16)}]}>{item.question}</Text>
        <ReadMore
          numberOfLines={3}
          renderTruncatedFooter={this._renderTruncatedFooter}
          renderRevealedFooter={this._renderRevealedFooter}
          onReady={this._handleTextReady}
        >
          <Text style={[styles.word, {marginBottom: 5}]}>{item.answer}</Text>
        </ReadMore>
      </View>
    )
  }
}

const styles = StyleSheet.create({ 
  container: {
    width: w - 50,
    backgroundColor: WHITE,
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
