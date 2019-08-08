import React, { Component } from 'react'
import { Text, StyleSheet, View, TouchableOpacity } from 'react-native'
import EvilIcons from 'react-native-vector-icons/EvilIcons'
import _ from 'lodash'
import Modal from 'react-native-modal'
import ModalSelector from 'react-native-modal-selector'
import { connect } from 'react-redux'
import { selectCity } from '../../pages/Auth/actions'
import { w, BG_COLOR, GREEN, RED, WHITE } from '../../constants/global'
import { Button } from '../../pages/Catalog/view/Button'

class Location extends Component {
  render() {
    const { visibility, hide, cities, city } = this.props
    const [blank = {}] = _.filter(cities, (item) => item.key === city)
    const { label = ''} = blank
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
              <Text style={styles.text}>Ваше местоположение:</Text>
              <Text style={styles.location}>{label} </Text>
            </View>
            <View style={{width: 200, marginTop: 20}}>
              <ModalSelector
                optionContainerStyle={styles.optionContainerStyle}
                optionTextStyle={styles.optionTextStyle}
                sectionTextStyle={styles.optionTextStyle}
                cancelStyle={styles.optionContainerStyle}
                cancelTextStyle={styles.cancelTextStyle}
                selectStyle={styles.selectStyle}
                selectTextStyle={styles.selectTextStyle}
                backdropPressToClose
                data={[{ key: 0, section: true, label: 'Выберите город' }, ...cities]}
                cancelText="Отмена"
                onChange={(option) => { this.props.selectCity(option.key) }}
              >
                <Button title="Изменить" onPress={() => {}} style={{backgroundColor: '#00CC65' }} />
              </ModalSelector>
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

const mapStateToProps = state => {
  return {
    cities: state.main.cities,
    city: state.auth.city
  }
}
export default connect(mapStateToProps, { selectCity })(Location)
