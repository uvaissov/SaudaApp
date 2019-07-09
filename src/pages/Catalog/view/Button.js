import React from 'react'
import { Text, View, StyleSheet, TouchableOpacity } from 'react-native'
import EvilIcons from 'react-native-vector-icons/EvilIcons'

const Button = (props) => {
  return (
    <TouchableOpacity onPress={props.onPress} >
      <View style={[styles.view, props.style]}>
        <View style={styles.container}>
          <View><EvilIcons name="cart" color="white" size={25} /></View>
          <Text style={styles.title}>{props.title}</Text>
        </View>      
      </View>
    </TouchableOpacity>
  )
}
const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1
  },
  view: {
    borderRadius: 25,
    backgroundColor: '#6ACB6D',
    height: 35
  },
  title: {
    fontSize: 14,
    fontFamily: 'CenturyGothic',
    fontWeight: '300',
    color: 'white',
    textAlign: 'center',
    marginLeft: 5
  }
})

export { Button }
