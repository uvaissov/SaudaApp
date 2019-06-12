import React from 'react'
import { Text, View, StyleSheet } from 'react-native'

const Window = (props) => {
  return (
    <View style={[styles.view, styles.shadow, props.style]}>
      <View>
        <Text style={styles.title}>{props.title}</Text>
      </View>
      <View>
        {props.children}
      </View>
    </View>
  )
}
const styles = StyleSheet.create({
  view: {
    backgroundColor: '#fff'
  },
  title: {
    fontSize: 22,
    fontFamily: 'gothic',
    color: '#3e4152'
  },
  shadow: {
    shadowColor: 'rgba(0, 0, 0, 0.1)',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 16,
    elevation: 8,
    position: 'relative'
  }
})

export { Window }
