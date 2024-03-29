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
import { FONT, BG_COLOR, normalize, hostName, WHITE } from '../../constants/global'
import { } from '../../transform'
import { Button } from '../Catalog/view/Button'

class Remember extends Component {
    state ={
      email: ''
    }
    async componentDidMount() {
      console.log('dm')
    }

    showLogin = () => {
      this.child.profileClick()
    }

    resetPassword = async () => {    
      let data = {}  
      try {
        const { email } = this.state
        console.log(`${hostName}/api/v1/password/email?email=${email}`)
        const response = await axios.post(`${hostName}/api/v1/password/email?email=${email}`)        
        data = response.data
        console.log(data)
      } catch (error) {
        data = error.response.data
        console.log(data)
      }

      const { status, errors } = data
      if (!_.isEmpty(errors)) {
        const values = _.values(errors)
        console.log('values', values)
        let message = ''
        values.map((row) => {
          message += `${row}\n`
          return message
        })
        Alert.alert(
          'Внимание',
          message,
          [
            {text: 'OK', onPress: () => console.log('OK Pressed')}
          ],
          {cancelable: false}
        )
      } 
      if (!_.isEmpty(status)) {
        const { navigation } = this.props
        Alert.alert(
          'Статус',
          'Мы отправили вам письмо ссылкой на сброс пароля',
          [
            {text: 'OK', onPress: () => navigation.goBack()}
          ],
          {cancelable: false}
        )
        this.setState({email: ''})  
      }
    }

    render() {
      const { navigation, auth } = this.props
      const { email } = this.state
      return (
        <View style={[styles.container]}>
          <CustomStatusBar backgroundColor="#fff" barStyle="dark-content" />
          <Header onPress={() => navigation.openDrawer()} navigation={navigation} />
          <KeyboardAwareScrollView keyboardVerticalOffset={50} behavior="padding" enabled>
            <HeaderButtonContainer showLogin={this.showLogin} selected="profile" navigation={navigation} token={auth.token} />
            <View style={styles.cardTitleView}><Text style={styles.cardTitleText} >Забыли пароль?</Text></View>
            <View style={styles.bodyView}>
              <View style={{padding: 10 }}>
                      
                <Text style={styles.textInfo}>Введите ваш e-mail и Вам на почту придет временный пароль</Text>
                <TextField wordStyle={{fontSize: normalize(16)}} value={email} onChange={(text) => this.setState({email: text})} placeholder="Ваш E-mail" />
                <Button onPress={() => this.resetPassword()} title="Отправить" style={{width: 200, alignSelf: 'center', marginTop: 20 }} />
                <TouchableOpacity onPress={() => navigation.goBack()}>
                  <Text style={styles.textBack}>Вернуться</Text>
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
    textDecorationLine: 'underline'
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
export default connect(mapStateToProps, { })(Remember)
