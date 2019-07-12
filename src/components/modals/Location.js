import React, { Component } from 'react'
import { Text, StyleSheet, View } from 'react-native'
import Modal from 'react-native-modal'
import { w } from '../../constants/global'
import { Button } from '../../pages/Catalog/view/Button'

export default class Location extends Component {
  render() {
    const { visibility, hide } = this.props
    return (
      <Modal useNativeDriver style={styles.container} deviceWidth={w} isVisible={visibility} onRequestClose={() => hide()} onBackdropPress={() => hide()} backdropOpacity={0.2} backdropColor="#000" >
        <View style={styles.container}>
          <View style={[styles.view, styles.shadow]}>
            <View style={styles.viewText}>
              <Text style={styles.text}>Ваше местоположение:</Text>
              <Text style={styles.location}>Алматы </Text>
            </View>
            <View style={{width: 200, marginTop: 20}}>
              <Button title="Изменить" onPress={() => {}} style={{backgroundColor: '#00CC65' }} />
            </View>           
          </View>
        </View>
      </Modal>
    )
  }
}

const styles = StyleSheet.create({
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
  }
})
