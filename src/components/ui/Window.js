import React from 'react'
import { Text, View, StyleSheet, TouchableOpacity } from 'react-native'
import EvilIcons from 'react-native-vector-icons/EvilIcons'
import { w } from '../../constants/global'

const Window = (props) => {
  return (
    <View style={[styles.view, styles.shadow, props.style]}>
      <View style={styles.titleView}>
        <Text style={[styles.title, { textTransform: props.normal ? 'none' : 'uppercase', textAlign: props.center ? 'center' : 'left' }]}>{props.title}</Text>
        {
          props.closed &&
        (
          <TouchableOpacity onPress={props.closed}>
            <View style={styles.closeBtn}>
              <EvilIcons name="close" size={30} />
            </View>
          </TouchableOpacity>
        )
        }
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
  closeBtn: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 10
  },
  title: {
    fontSize: 22,
    fontFamily: 'CenturyGothic',
    color: '#3e4152'    
  },
  titleView: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    //alignItems: 'center',
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
