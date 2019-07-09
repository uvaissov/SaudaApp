import React, {Component} from 'react'
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native'
//import { w } from '../../../../constants/global'

class ScrollElement extends Component {
  state={
    selected: false
  }
  render() {
    const { item } = this.props
    const { selected } = this.state
    console.log(item)
    return (
      <TouchableOpacity onPress={() => this.setState({selected: !selected})}>
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
export default ScrollElement

