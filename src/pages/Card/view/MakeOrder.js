import React, { Component } from 'react'
import { StyleSheet, View, TextInput } from 'react-native'
import Modal from 'react-native-modal'
import { connect } from 'react-redux'
import { Window } from '../../../components/ui/Window'
import { Button } from '../../../pages/Catalog/view/Button'
import { w, GREEN, BLACK, RED } from '../../../constants/global'

class MakeOrder extends Component {
  state = {
    address: '',
    name: '',
    phone: '',
    errors: {a: false, p: false, n: false}
  }

  init = () => {
    const { profile, token } = this.props
    if (token) {
      this.setState({
        address: profile.address,
        name: profile.name,
        phone: profile.phone
      })
    }    
  }

  make = () => {
    const { address, phone, name } = this.state
    let haveError = false
    const errors = {a: false, p: false, n: false}
    if (!address || address.length < 2) {
      haveError = true
      errors.a = true
    }
    if (!phone || phone.length < 2) {
      haveError = true
      errors.p = true
    }
    if (!name || name.length < 2) {
      haveError = true
      errors.n = true
    }
    this.setState({errors})
    if (haveError === true) {      
      return
    }
    this.props.action(name, phone, address)
  }

  render() {
    const { visibility, hide } = this.props
    const { address, name, phone, errors } = this.state
    return (
      <Modal onModalShow={() => this.init()} avoidKeyboard useNativeDriver style={{margin: 0}} deviceWidth={w} isVisible={visibility} onRequestClose={() => hide()} onBackdropPress={() => hide()} backdropOpacity={0.3} backdropColor="#000" >
        <Window style={styles.view} title="Введите данные необходимые для заказа">
          <View style={{padding: 15}}>            
            <View style={[styles.textView, errors.n ? {borderWidth: 1, borderColor: RED} : {}]}>
              <TextInput style={styles.textInput} placeholder="Ваше имя" value={name} onChangeText={(text) => this.setState({name: text})} />
            </View>
            <View style={[styles.textView, errors.p ? {borderWidth: 1, borderColor: RED} : {}]}>
              <TextInput style={styles.textInput} placeholder="Номер телефона" value={phone} onChangeText={(text) => this.setState({phone: text})} keyboardType="phone-pad" />
            </View>
            <View style={[styles.textView, errors.a ? {borderWidth: 1, borderColor: RED} : {}]}>
              <TextInput style={styles.textInput} placeholder="Адрес" value={address} onChangeText={(text) => this.setState({address: text})} />
            </View>
            <View style={{flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginTop: 10 }}>
              <Button title="Оформить заказ" onPress={() => this.make()} style={{backgroundColor: GREEN, width: 200 }} />              
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

const mapStateToProps = state => {
  return {
    token: state.auth.token,
    profile: state.profile
  }
}
export default connect(mapStateToProps, { })(MakeOrder)
