import React, { Component } from 'react'
import { Text, StyleSheet, View, TextInput, TouchableOpacity } from 'react-native'
import Modal from 'react-native-modal'
import { Window } from '../ui/Window'
import { Button } from '../../pages/Catalog/view/Button'
import { w, GREEN, BLACK } from '../../constants/global'

export default class Callback extends Component {
  state={
    selected: false
  }
  render() {
    const { visibility, hide } = this.props
    const { selected } = this.state
    return (
      <Modal useNativeDriver style={{margin: 0}} deviceWidth={w} isVisible={visibility} onRequestClose={() => hide()} onBackdropPress={() => hide()} backdropOpacity={0.3} backdropColor="#000" >
        <Window style={styles.view} title="Обратный звонок">
          <View style={{padding: 15}}>
            <View style={styles.textView}>
              <TextInput style={styles.textInput} placeholder="Ваш E-mail" />
            </View>
            <View style={styles.textView}>
              <TextInput style={styles.textInput} placeholder="Ваше имя" />              
            </View>            
            <View style={{flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginVertical: 20 }}>
              <Button title="Отправить" style={{backgroundColor: GREEN, width: 150 }} />              
            </View>
            <TouchableOpacity onPress={() => this.setState({selected: !selected})}>
              <View style={styles.container} >
                <View style={styles.buttonView}>
                  <View style={[styles.buttonInnerView, { backgroundColor: selected ? '#E24E63' : 'white'}]} />
                </View>
                <Text style={styles.word}>
                  Я соглашаюсь с Политикой конфеденциальности обработки персональных данных и даю согласие на обработки своих персональных данных</Text>
              </View>
            </TouchableOpacity>
          </View>
        </Window>
      </Modal>
    )
  }
}

const styles = StyleSheet.create({
  view: {
    width: w
  },
  textView: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 15,
    backgroundColor: 'rgba(0, 0, 0, 0.08)',
    paddingHorizontal: 20,
    marginTop: 20
  },
  textInput: {
    flex: 1,
    fontFamily: 'CenturyGothic',
    paddingVertical: 0,
    fontSize: 13,
    height: 30,
    color: 'rgba(0, 0, 0, 1)'
  },
  word: {
    fontSize: 11,
    fontFamily: 'CenturyGothic',
    color: BLACK,
    marginLeft: 10
  },
  buttonView: {
    borderRadius: 5, 
    borderWidth: 1.2,
    borderColor: '#6ACB6D',
    height: 19
  },
  buttonInnerView: {
    width: 10, 
    height: 10, 
    backgroundColor: 'red', 
    margin: 3, 
    borderRadius: 2
  },
  container: {
    flexDirection: 'row',
    //alignItems: 'center',    
    marginVertical: 8
  }
})
