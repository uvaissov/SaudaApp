import React, { Component } from 'react'
import _ from 'lodash'
import { Text, StyleSheet, View, TextInput, TouchableOpacity, Alert } from 'react-native'
import Modal from 'react-native-modal'
import { connect } from 'react-redux'
import { login } from '../../pages/Auth/actions'
import { getProfileData, setProfile } from '../../pages/Profile/actions'
import { Window } from '../ui/Window'
import { Button } from '../../pages/Catalog/view/Button'
import { w, GREEN, BLACK, RED } from '../../constants/global'

class Login extends Component {
  state = {
    mail: '',
    password: ''
  }

  login = async () => {
    const data = await this.props.login(this.state.mail, this.state.password)
    const { token, errors } = data
    console.log(data)
    if (!_.isEmpty(token)) {      
      this.props.hide()
      const dataCall = await this.props.getProfileData()
      this.props.setProfile(dataCall)
      this.setState({
        mail: '',
        password: ''
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
        'Ошибка авторизации',
        message,
        [
          {text: 'OK', onPress: () => console.log('OK Pressed')}
        ],
        {cancelable: false},
      )
    }
  }

  render() {
    const { visibility, hide, reg, remember } = this.props
    const { mail, password } = this.state
    return (
      <Modal avoidKeyboard useNativeDriver style={{margin: 0}} deviceWidth={w} isVisible={visibility} onRequestClose={() => hide()} onBackdropPress={() => hide()} backdropOpacity={0.3} backdropColor="#000" >
        <Window style={styles.view} title="Вход">
          <View style={{padding: 15}}>
            <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
              <Text style={[styles.word, {color: BLACK }]}>С помощью аккаунта</Text>
              <TouchableOpacity onPress={() => reg()}>
                <Text style={[styles.word, {color: GREEN }]}>Создать аккаунт</Text>
              </TouchableOpacity>
            </View>
            <View style={styles.textView}>
              <TextInput style={styles.textInput} placeholder="Ваш E-mail" value={mail} onChangeText={(text) => this.setState({mail: text})} />
            </View>
            <View style={styles.textView}>
              <TextInput secureTextEntry style={styles.textInput} placeholder="Пароль" value={password} onChangeText={(text) => this.setState({password: text})} />
            </View>
            <View style={{flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center'}}>
              <Button title="Войти" onPress={() => this.login()} style={{backgroundColor: GREEN, width: 150 }} />
              <TouchableOpacity onPress={() => remember()}>
                <Text style={[styles.word, {color: RED }]}>Забыли пароль?</Text>
              </TouchableOpacity>
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

const mapStateToProps = () => {
  return {}
}
export default connect(mapStateToProps, { login, getProfileData, setProfile })(Login)
