import React, { Component } from 'react'
import { Text, StyleSheet } from 'react-native'
import Modal from 'react-native-modal'
import { Window } from '../ui/Window'
import { w } from '../../constants/global'

export default class Login extends Component {
  render() {
    const { visibility, hide } = this.props
    return (
      <Modal style={{margin: 0}} deviceWidth={w} isVisible={visibility} onRequestClose={() => hide()} onBackdropPress={() => hide()} backdropOpacity={0.5} backdropColor="#fff" >
        <Window style={styles.view} title="РЕГИСТРАЦИЯ">
          <Text> Login </Text>
        </Window>
      </Modal>
    )
  }
}

const styles = StyleSheet.create({
  view: {
    width: w,
    height: 150
  }
})
