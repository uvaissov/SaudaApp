import React, {Component} from 'react'
import _ from 'lodash'
import { connect } from 'react-redux'
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native'
import { setSorted } from '../../actions'

class ScrollElementSort extends Component { 
  setSorted = (value) => {
    this.props.setSorted(value)
  }
  render() {
    const { item, sorted } = this.props
    const selected = sorted === item.id
    return (
      <TouchableOpacity onPress={() => this.setSorted(item.id)}>
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

const mapStateToProps = state => {
  return {      
    sort: state.catalog.sort,
    sorted: state.catalog.sorted
  }
}
export default connect(mapStateToProps, { setSorted })(ScrollElementSort)

