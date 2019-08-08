import React, {Component} from 'react'
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native'

class ScrollElementCategory extends Component { 
  navigate = (value) => {
    this.props.hide()
    this.props.navigation.navigate('Catalog', {categoryId: value})
  }
  render() {
    const { item, categoryId } = this.props
    const selected = categoryId === item.id
    return (
      <TouchableOpacity onPress={() => this.navigate(item.id)}>
        <View style={[styles.container]}>
          <View style={styles.buttonView}>
            <View style={[styles.buttonInnerView, { backgroundColor: selected ? '#E24E63' : 'white'}]} />
          </View>
          <View style={styles.textView}>
            <Text>{item.name}</Text>
          </View>
        </View>
      </TouchableOpacity> 
    )
  }
}

const styles = StyleSheet.create({ 
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 8
  },
  buttonView: {
    borderRadius: 5, 
    borderWidth: 1.2,
    borderColor: '#6ACB6D'
  },
  buttonInnerView: {
    width: 10, 
    height: 10, 
    backgroundColor: 'red', 
    margin: 3, 
    borderRadius: 2
  },
  textView: {
    flex: 1,
    paddingLeft: 15
  }
})

export default ScrollElementCategory

