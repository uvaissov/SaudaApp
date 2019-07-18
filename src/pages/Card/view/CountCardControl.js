import React from 'react'
import { Text, View, StyleSheet, TouchableOpacity } from 'react-native'
import { GREEN, RED, WHITE, BLACK, normalize } from '../../../constants/global'

const CountCardControl = (props) => {
  return (    
    <View style={[styles.view, props.style]}>      
      <View style={styles.container}>
        <TouchableOpacity onPress={props.onPressLeft} >
          <View style={styles.leftBtn}><Text style={styles.btnText}>-</Text></View>
        </TouchableOpacity>
        <View style={styles.textView}>
          <Text style={styles.title}>{props.count} шт</Text>
        </View>
        <TouchableOpacity onPress={props.onPressRight} >
          <View style={styles.rightBtn}><Text style={styles.btnText}>+</Text></View>
        </TouchableOpacity>
      </View>      
    </View>    
  )
}
const styles = StyleSheet.create({
  leftBtn: {
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
    minWidth: 40,
    borderTopLeftRadius: 25,
    borderBottomLeftRadius: 25,
    backgroundColor: RED
  },
  rightBtn: {
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
    minWidth: 40,
    borderTopRightRadius: 25,
    borderBottomRightRadius: 25,
    backgroundColor: GREEN
  },
  textView: {
    backgroundColor: '#F3F3F3',
    height: 30,
    flex: 1,
    justifyContent: 'center'
  },
  btnText: {
    fontSize: normalize(18),
    color: WHITE,
    fontWeight: 'normal'
  },
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    flex: 1
  },
  view: {
    flex: 1,
    borderRadius: 25,
    backgroundColor: WHITE,
    height: 30
  },
  title: {
    fontSize: normalize(11),
    fontFamily: 'CenturyGothic',
    fontWeight: '300',
    color: BLACK,
    textAlign: 'center',
    marginLeft: 5
  }
})

export { CountCardControl }
