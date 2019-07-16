import React, { Component } from 'react'
import { Text, StyleSheet, View, TextInput } from 'react-native'
import Modal from 'react-native-modal'
import { Window } from '../ui/Window'
import { Button } from '../../pages/Catalog/view/Button'
import { w, GREEN, BLACK } from '../../constants/global'

export default class Registration extends Component {
  render() {
    const { visibility, hide } = this.props
    return (
      <Modal useNativeDriver style={{margin: 0}} deviceWidth={w} isVisible={visibility} onRequestClose={() => hide()} onBackdropPress={() => hide()} backdropOpacity={0.3} backdropColor="#000" >
        <Window style={styles.view} title="Регистрация">
          <View style={{padding: 15}}>
            <View style={styles.textView}>
              <TextInput style={styles.textInput} placeholder="Ваш E-mail" />
            </View>
            <View style={styles.textView}>
              <TextInput style={styles.textInput} placeholder="Придумайте пароль" />              
            </View>
            <View>
              <Text style={[styles.word]}>(не короче шести символов)</Text>
            </View>
            <View style={styles.textView}>
              <TextInput style={styles.textInput} placeholder="Повторите пароль" />
            </View>
            <View style={styles.textView}>
              <TextInput style={styles.textInput} placeholder="Ваше имя" />
            </View>
            <View style={{flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginTop: 10 }}>
              <Button title="Зарегистрироваться" style={{backgroundColor: GREEN, width: 200 }} />              
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
    marginTop: 15
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
    fontSize: 10,
    fontFamily: 'CenturyGothic',
    color: BLACK,
    marginLeft: 25
  }
})
