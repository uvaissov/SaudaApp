import React from 'react'
import { View, ActivityIndicator, StyleSheet } from 'react-native'
import { GREEN } from '../../constants/global'

const Loader = ({ animating, color = GREEN }) => (
  <View style={styles.container}>
    <ActivityIndicator size="large" color={color} animating={animating} />
  </View>
)

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  }
})

export default Loader
