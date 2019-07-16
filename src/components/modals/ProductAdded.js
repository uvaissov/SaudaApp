import React, { Component } from 'react'
import { StyleSheet, View } from 'react-native'
import Modal from 'react-native-modal'
import { Window } from '../ui/Window'
import { Button } from '../../pages/Catalog/view/Button'
import { w, GREEN, BLACK } from '../../constants/global'

export default class Login extends Component {
  render() {
    const { visibility, hide } = this.props
    return (
      <Modal useNativeDriver style={{margin: 0}} deviceWidth={w} isVisible={visibility} onRequestClose={() => hide()} onBackdropPress={() => hide()} backdropOpacity={0.3} backdropColor="#000" >
        <Window style={styles.view} title="Товар добавлен в корзину" normal center>
          <View style={{padding: 15}}>
            <View style={{flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center'}}>
              <Button title="Продолжить покупки" style={{backgroundColor: 'rgba(0, 0, 0, 0.08)', width: 180 }} textStyle={{color: BLACK, fontSize: 12 }} />
              <Button title="Оформить заказ" style={{backgroundColor: GREEN, width: 180 }} textStyle={{ fontSize: 12 }} />
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
