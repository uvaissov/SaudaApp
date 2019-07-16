import React, { Component } from 'react'
import { Text, StyleSheet, View, TextInput, TouchableOpacity } from 'react-native'
import Modal from 'react-native-modal'
import { Window } from '../ui/Window'
import { Button } from '../../pages/Catalog/view/Button'
import { w, GREEN, BLACK, RED } from '../../constants/global'

export default class Login extends Component {
  render() {
    const { visibility, hide, reg } = this.props
    return (
      <Modal useNativeDriver style={{margin: 0}} deviceWidth={w} isVisible={visibility} onRequestClose={() => hide()} onBackdropPress={() => hide()} backdropOpacity={0.3} backdropColor="#000" >
        <Window style={styles.view} title="Вход">
          <View style={{padding: 15}}>
            <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
              <Text style={[styles.word, {color: BLACK }]}>С помощью аккаунта</Text>
              <TouchableOpacity onPress={() => reg()}>
                <Text style={[styles.word, {color: GREEN }]}>Создать аккаунт</Text>
              </TouchableOpacity>
            </View>
            <View style={styles.textView}>
              <TextInput style={styles.textInput} placeholder="Ваш E-mail" />
            </View>
            <View style={styles.textView}>
              <TextInput style={styles.textInput} placeholder="Пароль" />
            </View>
            <View style={{flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center'}}>
              <Button title="Войти" style={{backgroundColor: GREEN, width: 150 }} />
              <Text style={[styles.word, {color: RED }]}>Забыли пароль?</Text>
            </View>
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
    marginVertical: 10
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
    fontSize: 13,
    fontFamily: 'CenturyGothic'
  }
})
