import React, {Component} from 'react'
//import _ from 'lodash'
import axios from 'axios'
import { StyleSheet, Text, View, ScrollView, TouchableOpacity } from 'react-native'
//import axios from 'axios'
import { connect } from 'react-redux'
import Header from '../../components/main/Header'
import Footer from '../../components/main/Footer'
import CustomStatusBar from '../../components/CustomStatusBar'
import { HeaderButtonContainer } from './view/HeaderButtonContainer'
import { TextField } from './view/TextField'
import { getProfileData } from './actions'
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
    } catch (error) {
      console.log(error)
    }
  }
  
  render() {
    const { navigation, auth } = this.props
    const { name, email, phone, address, additional_address} = this.state
    return (
      <View style={[styles.container]}>
        <CustomStatusBar backgroundColor="#fff" barStyle="dark-content" />
        <Header onPress={() => navigation.openDrawer()} />
        <HeaderButtonContainer selected="profile" navigation={navigation} token={auth.token} />
        <ScrollView showsVerticalScrollIndicator={false} style={styles.scrollView}>          
          <View style={styles.bodyView}>
            <View style={{padding: 10 }}>
              <TextField value={name} onChange={(text) => this.setState({name: text})} placeholder="Ф.И.О" />
              <TextField value={email} onChange={(text) => this.setState({email: text})} placeholder="Электронная почта" />
              <TextField value={phone} onChange={(text) => this.setState({phone: text})} placeholder="Ваш телефон" />
              <TextField value={address} onChange={(text) => this.setState({address: text})} placeholder="Ваш адрес" />
              <TextField value={additional_address} onChange={(text) => this.setState({additional_address: text})} placeholder="Дополнительный адрес" />          
              <TouchableOpacity>
                <Text style={styles.text}>Сменить пароль</Text>
              </TouchableOpacity>
              <TouchableOpacity>
                <Text style={styles.text}>Редактировать данные</Text>
              </TouchableOpacity>              
            </View>
          </View>
        </ScrollView>
        <Footer navigation={navigation} />
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
export default connect(mapStateToProps, { getProfileData })(Profile)
