import React, { Component } from 'react'
import { Text, StyleSheet, View, TouchableOpacity, TouchableHighlight } from 'react-native'
import EvilIcons from 'react-native-vector-icons/EvilIcons'
import Modal from 'react-native-modal'
import call from 'react-native-phone-call'
import { w, BG_COLOR, GREEN, RED, WHITE } from '../../constants/global'
import { Button } from '../../pages/Catalog/view/Button'

class CallBackIntro extends Component {
  call = () => {
    const args = {
      number: '+77273468041', // String value with the number to call
      prompt: false // Optional boolean property. Determines if the user should be prompt prior to the call 
    }
     
    call(args).catch(console.error)
  }

  render() {
    const { visibility, hide, callback} = this.props
    return (
      <Modal useNativeDriver style={styles.container} deviceWidth={w} isVisible={visibility} onRequestClose={() => hide()} onBackdropPress={() => hide()} backdropOpacity={0.2} backdropColor="#000" >
        <TouchableOpacity style={styles.closeBtnView} onPress={() => hide()} >
          <View style={styles.closeBtn}>
            <EvilIcons name="close" size={30} />
          </View>
        </TouchableOpacity>
        <View style={styles.container}>
          <View style={[styles.view, styles.shadow]}>
            <View style={styles.viewText}>
              <Text style={styles.text}>Тел:</Text>
              <TouchableHighlight onPress={() => this.call()} >
                <Text style={styles.location} >+7 (727) 346 80 41</Text>
              </TouchableHighlight>
            </View>
            <View style={{width: 200, marginTop: 20}}>
              <Button title="Обратный звонок" onPress={() => callback()} style={{backgroundColor: '#00CC65' }} />
            </View>           
          </View>
        </View>
      </Modal>
    )
  }
}

const styles = StyleSheet.create({
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
  },
  text: {
    fontFamily: 'CenturyGothic',
    fontSize: 16,
    color: 'black'
  },
  location: {
    fontFamily: 'CenturyGothic',
    fontSize: 16,
    color: '#00CC65'
  },
  viewText: {
    flexDirection: 'row'
  },
  view: {
    width: w - 40,
    height: 150,
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center'
  },
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    margin: 0
  },
  shadow: {
    shadowColor: 'rgba(0, 0, 0, 0.1)',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 5,
    position: 'relative'
  },
  optionContainerStyle: {
    backgroundColor: BG_COLOR,
    borderWidth: 1,
    borderColor: GREEN
  },
  optionTextStyle: {
    color: GREEN
  },
  cancelTextStyle: {
    paddingVertical: 5,
    color: RED
  },
  selectStyle: {
    borderColor: GREEN,
    borderWidth: 1,
    borderRadius: 1,
    flexDirection: 'row',
    paddingVertical: 10
  },
  selectTextStyle: {
    fontSize: 16,
    color: 'white',
    paddingHorizontal: 15
  }
})

export default CallBackIntro
