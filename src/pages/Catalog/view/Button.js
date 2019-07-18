import React from 'react'
import { Text, View, StyleSheet, TouchableOpacity } from 'react-native'
import EvilIcons from 'react-native-vector-icons/EvilIcons'

const Button = (props) => {
  const { onPress } = props
  return (
    <TouchableOpacity onPress={onPress} >
      <View style={[styles.view, props.style]}>
        <View style={styles.container}>
          {
            props.icon &&
            <View><EvilIcons name={props.icon} color="white" size={25} /></View>
          }          
          <Text style={[styles.title, props.textStyle]}>{props.title}</Text>
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
