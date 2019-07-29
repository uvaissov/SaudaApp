import React, {Component} from 'react'
import { connect } from 'react-redux'
import _ from 'lodash'
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native'
import { addBrandFilter, delBrandFilter } from '../../actions'

class ScrollElement extends Component {
  onSelect = () => {
    const { item, filterBrands } = this.props
    const selected = _.includes(filterBrands, item) 
    if (selected) {
      this.props.delBrandFilter(item)
    } else {
      this.props.addBrandFilter(item)
    }
  }
  render() {
    const { item, filterBrands } = this.props
    const selected = _.includes(filterBrands, item) 
    return (
      <TouchableOpacity onPress={() => this.onSelect()}>
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
    filterBrands: state.catalog.filterBrands
  }
}
export default connect(mapStateToProps, { addBrandFilter, delBrandFilter })(ScrollElement)

