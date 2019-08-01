import React, { Component } from 'react'
import { StyleSheet, View, FlatList, Text } from 'react-native'
//import _ from 'lodash'
import Modal from 'react-native-modal'
import { connect } from 'react-redux'
import { setSorted } from '../../actions'
import ScrollElementSort from './ScrollElementSort'
import { w, h } from '../../../../constants/global'

class SortModal extends Component {  
  render() {
    const { visibility, hide, sort} = this.props
    return (
      <Modal                   
        deviceWidth={w}
        deviceHeight={h}
        isVisible={visibility} 
        onRequestClose={() => hide()} 
        onBackdropPress={() => hide()} 
        backdropOpacity={0.2}
        backdropColor="#000"
        useNativeDriver
      >
          
        <View style={styles.view}>          
          <View style={styles.content}>              
            <FlatList 
              data={sort}
              renderItem={({item}) => (<ScrollElementSort item={item} />)}
            />
          </View>           
        </View>          
      </Modal>
    )
  }
}

const styles = StyleSheet.create({
  content: {
    backgroundColor: 'white',
    height: h * 0.75,
    width: w - 50,
    borderWidth: 1,
    borderColor: '#6ACB6D',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    padding: 25
  },
  view: {
    height: h,
    marginBottom: 0,
    justifyContent: 'flex-end',
    alignItems: 'center'
  }
})

const mapStateToProps = state => {
  return {      
    sort: state.catalog.sort,
    sorted: state.catalog.sorted
  }
}
export default connect(mapStateToProps, { setSorted })(SortModal)
  
