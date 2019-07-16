import React from 'react'
import { Text, View, StyleSheet } from 'react-native'

const Window = (props) => {
  return (
    <View style={[styles.view, styles.shadow, props.style]}>
      <View style={styles.titleView}>
        <Text style={[styles.title, { textTransform: props.normal ? 'none' : 'uppercase', textAlign: props.center ? 'center' : 'left' }]}>{props.title}</Text>
      </View>
      <View style={styles.separator} />
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
    fontFamily: 'CenturyGothic',
    color: '#3e4152'    
  },
  titleView: {
    paddingLeft: 15,
    paddingTop: 15,
    paddingBottom: 5
  },
  shadow: {
    shadowColor: 'rgba(0, 0, 0, 0.1)',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 16,
    elevation: 6,
    position: 'relative'
  },
  separator: {
    borderBottomColor: 'rgba(0, 0, 0, 0.3)',
    borderBottomWidth: 1,
    marginHorizontal: 5
  }
})

export { Window }
