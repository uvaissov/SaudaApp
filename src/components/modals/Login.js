import React, { Component } from 'react'
import { Text, StyleSheet, View, TextInput } from 'react-native'
import Modal from 'react-native-modal'
import { Window } from '../ui/Window'
import { Button } from '../../pages/Catalog/view/Button'
import { w, GREEN } from '../../constants/global'

export default class Login extends Component {
  render() {
    const { visibility, hide } = this.props
    return (
      <Modal useNativeDriver style={{margin: 0}} deviceWidth={w} isVisible={visibility} onRequestClose={() => hide()} onBackdropPress={() => hide()} backdropOpacity={0.5} backdropColor="#fff" >
        <Window style={styles.view} title="Вход">
          <View style={{padding: 15}}>
            <View style={{flexDirection: 'row', justifyContent: 'space-between'}}><Text>С помощью аккаунта</Text><Text>Создать аккаунт</Text></View>
            <View><TextInput /></View>
            <View><TextInput /></View>
            <View style={{flexDirection: 'row'}}>
              <Button title="Войти" style={{backgroundColor: GREEN, width: 150 }} />
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
  }
})
