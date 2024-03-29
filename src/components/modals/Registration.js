import React, { Component } from 'react'
import _ from 'lodash'
import { Text, StyleSheet, View, TextInput, Alert } from 'react-native'
import Modal from 'react-native-modal'
import { connect } from 'react-redux'
import { register } from '../../pages/Auth/actions'
import { getProfileData, setProfile } from '../../pages/Profile/actions'
import { Window } from '../ui/Window'
import { Button } from '../../pages/Catalog/view/Button'
import { w, GREEN, BLACK } from '../../constants/global'

class Registration extends Component {
  state = {
    mail: '',
    password: '',
    confirm: '',
    name: '',
    phone: ''
  }

  register = async () => {
    const { mail, password, confirm, name, phone } = this.state

    if (!mail || !password || !confirm || !name) {
      //alert('Необходимо заполнить обязательные поля')
      //return {}
    }

    const data = await this.props.register(mail, name, password, confirm, phone)
    const { token, errors } = data
    if (!_.isEmpty(token)) {
      this.props.hide()
      const dataCall = await this.props.getProfileData()
      this.props.setProfile(dataCall)
      this.setState({
        mail: '',
        password: '',
        confirm: '',
        name: '',
        phone: ''
      })
    }
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
        'Ошибка регистрации',
        message,
        [
          {text: 'OK', onPress: () => console.log('OK Pressed')}
        ],
        {cancelable: false},
      )
    }
  }

  render() {
    const { visibility, hide } = this.props
    const { mail, password, confirm, name, phone } = this.state
    return (
      <Modal avoidKeyboard useNativeDriver style={{margin: 0}} deviceWidth={w} isVisible={visibility} onRequestClose={() => hide()} onBackdropPress={() => hide()} backdropOpacity={0.3} backdropColor="#000" >
        <Window style={styles.view} title="Регистрация">
          <View style={{padding: 15}}>            
            <View style={styles.textView}>
              <TextInput style={styles.textInput} placeholder="Ваш E-mail" value={mail} onChangeText={(text) => this.setState({mail: text})} />
            </View>
            <View style={styles.textView}>
              <TextInput secureTextEntry style={styles.textInput} placeholder="Придумайте пароль" value={password} onChangeText={(text) => this.setState({password: text})} />              
            </View>
            <View>
              <Text style={[styles.word]}>(не короче восьми символов)</Text>
            </View>
            <View style={styles.textView}>
              <TextInput secureTextEntry style={styles.textInput} placeholder="Повторите пароль" value={confirm} onChangeText={(text) => this.setState({confirm: text})} />
            </View>
            <View style={styles.textView}>
              <TextInput style={styles.textInput} placeholder="Ваше имя" value={name} onChangeText={(text) => this.setState({name: text})} />
            </View>
            <View style={styles.textView}>
              <TextInput style={styles.textInput} placeholder="Номер телефона" value={phone} onChangeText={(text) => this.setState({phone: text})} keyboardType="phone-pad" />
            </View>
            <View style={{flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginTop: 10 }}>
              <Button title="Зарегистрироваться" onPress={() => this.register()} style={{backgroundColor: GREEN, width: 200 }} />              
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

const mapStateToProps = () => {
  return {}
}
export default connect(mapStateToProps, { register, getProfileData, setProfile })(Registration)
//export default Registration
