import React from 'react'
import { TextInput, View, StyleSheet } from 'react-native'
import { WHITE, GREEN, FONT, normalize, BLACK } from '../../../constants/global'

const TextField = ({value, placeholder, style, onChange, wordStyle, secureTextEntry}) => {  
  return (
    <View style={[styles.view, style]}>
      <TextInput secureTextEntry={secureTextEntry} style={[styles.word, wordStyle]} value={value} onChangeText={onChange} placeholder={placeholder} />
    </View>
  )
}
const styles = StyleSheet.create({
  view: {
    backgroundColor: WHITE,
    borderRadius: 30,
    borderWidth: 1,
    borderColor: GREEN,
    marginTop: 10
  },
  word: {
    fontFamily: FONT,
    fontSize: normalize(16),
    color: BLACK,
    paddingVertical: 5,
    paddingHorizontal: 20
  }
})

export { TextField }
