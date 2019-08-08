import React, { Component } from 'react'
import { Text, StyleSheet, View, TextInput, TouchableOpacity, Alert } from 'react-native'
import axios from 'axios'
import _ from 'lodash'
import Modal from 'react-native-modal'
import { TextInputMask } from 'react-native-masked-text'
import { Window } from '../ui/Window'
import { Button } from '../../pages/Catalog/view/Button'
import { w, GREEN, BLACK, hostName } from '../../constants/global'

export default class Callback extends Component {
  state={
    selected: false,
    number: '',
    name: ''
  }

  send = async () => {    
    let data = {}
    const { selected, number, name } = this.state
    if (selected === false) {
      Alert.alert(
        'Здраствуйте',
        'Перед отправкой формы, необходимо принять условия политики обработки данных',
        [
          {text: 'OK', onPress: () => {}}
        ],
        {cancelable: false}
      )
      return
    }

    try {      
      console.log(`${hostName}/api/v1/feedback?phone=${number}&name=${name}&agreement=${selected}`)
      const response = await axios.post(`${hostName}/api/v1/feedback?phone=${number}&name=${name}&agreement=${selected}`)        
      data = response.data
      console.log(data)
    } catch (error) {
      data = error.response.data
      console.log(data)
    }

    const { feedback, errors } = data
    if (!_.isEmpty(errors)) {
      const values = _.values(errors)
      let message = ''
      values.map((row) => {
        row.map((inner) => {
          message += `${inner}\n`
          return message
        })
        return message
      })
      Alert.alert(
        'Внимание',
        message,
        [
          {text: 'OK', onPress: () => console.log('OK Pressed')}
        ],
        {cancelable: false}
      )
    } 
    if (feedback === true) {
      const { hide } = this.props
      
      Alert.alert(
        'Спасибо',
        'Скоро с вами свяжутся по указанному вами номеру',
        [
          {text: 'OK', onPress: () => hide()}
        ],
        {cancelable: false}
      )  
    }
  }

  render() {
    const { visibility, hide } = this.props
    const { selected, number, name } = this.state
    return (
      <Modal useNativeDriver style={{margin: 0}} deviceWidth={w} isVisible={visibility} onRequestClose={() => hide()} onBackdropPress={() => hide()} backdropOpacity={0.3} backdropColor="#000" >
        <Window closed={() => hide()} style={styles.view} title="Обратный звонок">
          <View style={{padding: 15}}>
            <View style={styles.textView}>
              <TextInputMask
                //type={'cel-phone'}
                type={'custom'}
                options={{
                  //maskType: 'INTERNATIONAL'
                  mask: '+7 999 999 99 99'
                }}
                value={number}
                onChangeText={text => {
                  this.setState({
                    number: text
                  })
                }}
                style={styles.textInput} 
                placeholder="Ваш номер"
              />
            </View>
            <View style={styles.textView}>
              <TextInput value={name} onChangeText={(text) => this.setState({name: text})} style={styles.textInput} placeholder="Ваше имя" />              
            </View>            
            <View style={{flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginVertical: 20 }}>
              <Button title="Отправить" style={{backgroundColor: GREEN, width: 150 }} onPress={() => this.send()} />              
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
