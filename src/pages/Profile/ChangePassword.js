import React, {Component} from 'react'
import { StyleSheet, Text, View, TouchableOpacity, Alert } from 'react-native'
import { connect } from 'react-redux'
import axios from 'axios'
import _ from 'lodash'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import Header from '../../components/main/Header'
import Footer from '../../components/main/Footer'
import CustomStatusBar from '../../components/CustomStatusBar'
import { HeaderButtonContainer } from './view/HeaderButtonContainer'
import { TextField } from './view/TextField'
import { } from './actions'
import { FONT, BG_COLOR, normalize, hostName, WHITE, RED } from '../../constants/global'
import { } from '../../transform'
import { Button } from '../Catalog/view/Button'

class ChangePassword extends Component {
    state ={
      password_old: '',
      password: '',
      password_confirmation: ''
    }
    async componentDidMount() {
      console.log('dm')
    }

    resetPassword = async () => {    
      let data = {}  
      try {
        const { token } = this.props.auth
        const { password_old, password, password_confirmation } = this.state
        const response = await axios.post(`${hostName}/api/v1/user/password?password_old=${password_old}&password=${password}&password_confirmation=${password_confirmation}&api_token=${token}`)
        data = response.data
        console.log(data)
      } catch (error) {
        console.log(error)
        data = error.response.data
        console.log(data)
      }

      const { password_updated, errors } = data
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
          'Внимание',
          message,
          [
            {text: 'OK', onPress: () => console.log('OK Pressed')}
          ],
          {cancelable: false},
        )
      }  
      if (password_updated && password_updated > -1) {
        const { navigation } = this.props
        Alert.alert(
          'Статус',
          'Пароль успешно изменен',
          [
            {text: 'OK', onPress: () => navigation.goBack()}
          ],
          {cancelable: false},
        )
        this.setState({ 
          password_old: '',
          password: '',
          password_confirmation: ''
        })  
      }
    }

    render() {
      const { navigation, auth } = this.props
      const { password_old, password, password_confirmation } = this.state
      return (
        <View style={[styles.container]}>
          <CustomStatusBar backgroundColor="#fff" barStyle="dark-content" />
          <Header onPress={() => navigation.openDrawer()} navigation={navigation} />
          <KeyboardAwareScrollView keyboardVerticalOffset={50} behavior="padding" enabled>
            <HeaderButtonContainer showLogin={this.showLogin} selected="profile" navigation={navigation} token={auth.token} />
            <View style={styles.cardTitleView}><Text style={styles.cardTitleText} >Сменить пароль</Text></View>
            <View style={styles.bodyView}>
              <View style={{padding: 10 }}>
                <TextField secureTextEntry wordStyle={{fontSize: normalize(16)}} value={password_old} onChange={(text) => this.setState({password_old: text})} placeholder="Старый пароль" />
                <TextField secureTextEntry wordStyle={{fontSize: normalize(16)}} value={password} onChange={(text) => this.setState({password: text})} placeholder="Новый пароль" />
                <TextField secureTextEntry wordStyle={{fontSize: normalize(16)}} value={password_confirmation} onChange={(text) => this.setState({password_confirmation: text})} placeholder="Подтвердите новый пароль" />
                <Button onPress={() => this.resetPassword()} title="Сохранить" style={{width: 200, alignSelf: 'center', marginTop: 20 }} />
                <TouchableOpacity onPress={() => navigation.navigate('Remember')}>
                  <Text style={styles.textBack}>Забыли пароль?</Text>
                </TouchableOpacity>       
              </View>
            </View>
          </KeyboardAwareScrollView>      
          <Footer onRef={ref => (this.child = ref)} navigation={navigation} />         
        </View>
      )
    }
}

const styles = StyleSheet.create({  
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    backgroundColor: BG_COLOR
  },
  bodyView: {
    flex: 1
  },
  text: {
    fontFamily: FONT,
    fontSize: normalize(22),
    marginTop: 20
  },
  textBack: {
    textAlign: 'center',
    fontFamily: FONT,
    fontSize: normalize(15),
    marginTop: 35,
    color: RED
  },
  textInfo: {
    fontFamily: FONT,
    fontSize: normalize(12),
    marginVertical: 20
  },
  cardTitleView: {
    backgroundColor: WHITE,
    marginBottom: 15,
    marginTop: 10,
    paddingLeft: 25,
    paddingVertical: 5
  },
  cardTitleText: {
    textTransform: 'uppercase',
    fontSize: normalize(17),
    fontFamily: FONT
  },
  shadow: {
    shadowColor: 'rgba(48, 25, 0, 0.1)',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 16,
    elevation: 8,
    position: 'relative'

  }
})

const mapStateToProps = state => {
  return {
    auth: state.auth
  }
}
export default connect(mapStateToProps, { })(ChangePassword)
