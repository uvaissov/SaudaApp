import React, { Component } from 'react'
import { StyleSheet, View, FlatList, TouchableOpacity } from 'react-native'
//import _ from 'lodash'
import Modal from 'react-native-modal'
import EvilIcons from 'react-native-vector-icons/EvilIcons'
import { connect } from 'react-redux'
import { setSorted } from '../../actions'
import ScrollElementCategory from './ScrollElementCategory'
import { w, h, WHITE } from '../../../../constants/global'

class CategoryModal extends Component {  
  render() {
    const { visibility, hide, data, navigation, categoryId } = this.props
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
          <TouchableOpacity style={styles.closeBtnView} onPress={() => hide()} >
            <View style={styles.closeBtn}>
              <EvilIcons name="close" size={30} />
            </View>
          </TouchableOpacity>          
          <View style={styles.content}>              
            <FlatList 
              data={data}
              renderItem={({item}) => (<ScrollElementCategory hide={hide} categoryId={categoryId} navigation={navigation} item={item} />)}
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
  },
  closeBtnView: {
    top: -25
  },
  closeBtn: {
    backgroundColor: WHITE,
    borderRadius: 100,    
    borderWidth: 0,
    alignItems: 'center',
    justifyContent: 'center',
    width: 50,
    height: 50
  }
})

const mapStateToProps = state => {
  return {      
    sort: state.catalog.sort,
    sorted: state.catalog.sorted
  }
}
export default connect(mapStateToProps, { setSorted })(CategoryModal)
  
