import React from 'react'
import { StyleSheet, View, StatusBar} from 'react-native'
import { statusBarHeight } from '../constants/global'

const CustomStatusBar = ({ absolute, backgroundColor, ...props }) => (
  <View style={[styles.statusBar, { backgroundColor }, absolute]}>
    <StatusBar animated showHideTransition='slide' translucent backgroundColor={backgroundColor} {...props} />
  </View>
)
const STATUSBAR_HEIGHT = statusBarHeight
const styles = StyleSheet.create({
  statusBar: {
    height: STATUSBAR_HEIGHT
  }
})
export default CustomStatusBar
