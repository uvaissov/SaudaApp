import React, { Component } from 'react'
import { StyleSheet, View } from 'react-native'
import Modal from 'react-native-modal'
import { Window } from '../ui/Window'
import { Button } from '../../pages/Catalog/view/Button'
import { w, GREEN, BLACK, normalize } from '../../constants/global'

export default class ProductAdded extends Component {
  navigateToCard = () => {
    const { hide, navigation } = this.props
    hide()
    navigation.navigate('Card')    
  }
  render() {
    const { visibility, hide } = this.props

    const width = (w - 50) / 2

    return (
      <Modal useNativeDriver style={{margin: 0}} deviceWidth={w} isVisible={visibility} onRequestClose={() => hide()} onBackdropPress={() => hide()} backdropOpacity={0.3} backdropColor="#000" >
        <Window style={styles.view} title="Товар добавлен в корзину" normal center>
          <View style={{padding: 15}}>
            <View style={{flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center'}}>
              <Button onPress={() => hide()} title="Продолжить покупки" style={{backgroundColor: 'rgba(0, 0, 0, 0.08)', width: width }} textStyle={{color: BLACK, fontSize: normalize(9) }} />
              <Button onPress={() => this.navigateToCard()} title="Оформить заказ" style={{backgroundColor: GREEN, width: width }} textStyle={{ fontSize: normalize(9) }} />
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
