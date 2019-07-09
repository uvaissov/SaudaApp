import React from 'react'
import { Text, View, StyleSheet, TouchableOpacity } from 'react-native'
import AntDesign from 'react-native-vector-icons/AntDesign'

const OutlineOption = (props) => {
  return (
    <TouchableOpacity onPress={props.onPress} >
      <View style={[styles.view, props.style]}>
        <View style={styles.container}>          
          <Text style={styles.title}>{props.title}</Text>
          <View><AntDesign name="caretdown" color="#6ACB6D" size={12} /></View>
        </View>      
      </View>
    </TouchableOpacity>
  )
}
const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 15,
    alignItems: 'center',
    flex: 1
  },
  view: {
    borderRadius: 25,
    borderColor: '#6ACB6D',
    backgroundColor: 'white',
    borderWidth: 1,
    height: 40
  },
  title: {
    fontSize: 12,
    fontFamily: 'CenturyGothic',
    fontWeight: '300',
    color: 'black',
    //textAlign: 'center',
    marginLeft: 5
  }
})

export { OutlineOption }
