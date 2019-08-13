import React, {Component} from 'react'
import _ from 'lodash'
import axios from 'axios'
import { StyleSheet, Text, View, ScrollView, TouchableOpacity, Alert } from 'react-native'
//import axios from 'axios'
import { connect } from 'react-redux'
import Header from '../../components/main/Header'
import Footer from '../../components/main/Footer'
import CustomStatusBar from '../../components/CustomStatusBar'
import { HeaderButtonContainer } from './view/HeaderButtonContainer'
import { TextField } from './view/TextField'
import { getProfileData } from './actions'
import { exit } from '../Auth/actions'
import { clearFavs } from '../Favorite/actions'
import { FONT, BG_COLOR, normalize, hostName } from '../../constants/global'
import { transformProfile } from '../../transform'

class Profile extends Component {
  state ={
    name: '', email: '', phone: '', address: '', additional_address: ''
  }
  async componentDidMount() {
    try {
      const { token } = this.props.auth
      const { data } = await axios.get(`${hostName}/api/v1/user?api_token=${token}`)
      this.setState(transformProfile(data))
      console.log(data)
    } catch (error) {
      console.log(error.response)
      console.log(error)
    }
  }

  showLogin = () => {
    this.child.profileClick()
  }

  exit = async () => {
    this.props.exit()
    this.props.clearFavs()
    Alert.alert(
      'Внимание',
      'Вы успешно вышли из своего аккаунта',
      [
        {text: 'OK', onPress: () => this.props.navigation.goBack()}
      ],
      {cancelable: false},
    ) 
  }

  editData = async () => {
    let data = {}  
    try {
      const { token } = this.props.auth
      const { name, email, phone, address, additional_address } = this.state
      const response = await axios.post(`${hostName}/api/v1/user/update?api_token=${token}&name=${name}&email=${email}&phone=${phone}&address=${address}&additional_address=${additional_address}`)
      data = response.data
      console.log(data)
    } catch (error) {
      data = error.response.data
      console.log(data)
    }

    const { updated, errors } = data
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
    console.log(updated)
    if (updated && updated > -1) {
      Alert.alert(
        'Отлично',
        'Данные сохранены',
        [
          {text: 'OK', onPress: () => console.log('OK Pressed')}
        ],
        {cancelable: false},
      )  
    }
  }
  
  render() {
    const { navigation, auth } = this.props
    const { name, email, phone, address, additional_address} = this.state
    return (
      <View style={[styles.container]}>
        <CustomStatusBar backgroundColor="#fff" barStyle="dark-content" />
        <Header onPress={() => navigation.openDrawer()} navigation={navigation} />
        <HeaderButtonContainer showLogin={this.showLogin} selected="profile" navigation={navigation} token={auth.token} />
        <ScrollView showsVerticalScrollIndicator={false} style={styles.scrollView}>          
          <View style={styles.bodyView}>
            <View style={{padding: 10 }}>
              <TextField value={name} onChange={(text) => this.setState({name: text})} placeholder="Ф.И.О" />
              <TextField value={email} onChange={(text) => this.setState({email: text})} placeholder="Электронная почта" />
              <TextField value={phone} onChange={(text) => this.setState({phone: text})} placeholder="Ваш телефон" />
              <TextField value={address} onChange={(text) => this.setState({address: text})} placeholder="Ваш адрес" />
              <TextField value={additional_address} onChange={(text) => this.setState({additional_address: text})} placeholder="Дополнительный адрес" />          
              <TouchableOpacity onPress={() => navigation.navigate('ChangePassword')}>
                <Text style={styles.text}>Сменить пароль</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => this.editData()}>
                <Text style={styles.text}>Редактировать данные</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => this.exit()}>
                <Text style={styles.text}>Выход из аккаунта</Text>
              </TouchableOpacity>           
            </View>
          </View>
        </ScrollView>
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
  scrollView: {
    flex: 1
  },
  text: {
    fontFamily: FONT,
    fontSize: normalize(15),
    marginTop: 20
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
export default connect(mapStateToProps, { getProfileData, exit, clearFavs })(Profile)
