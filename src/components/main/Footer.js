import React, {Component} from 'react'
import { StyleSheet, View, TouchableOpacity } from 'react-native'
import FastImage from 'react-native-fast-image'
import Login from '../../components/modals/Login'
import Registration from '../../components/modals/Registration'
import Callback from '../../components/modals/Callback'

export default class Footer extends Component {
  state={
    loginShow: false,
    regShow: false,
    callBackShow: false
  }
  render() {
    const { loginShow, regShow, callBackShow } = this.state
    const { navigation } = this.props
    return (
      <View style={[styles.container, styles.shadow]}>
        <Login visibility={loginShow} hide={() => this.setState({loginShow: false})} reg={() => this.setState({regShow: true, loginShow: false})} />           
        <Registration visibility={regShow} hide={() => this.setState({regShow: false})} />
        <Callback visibility={callBackShow} hide={() => this.setState({callBackShow: false})} />
        <View style={styles.view}>
          <TouchableOpacity onPress={() => this.setState({loginShow: true})}>
            <View style={styles.buttton}>
              <FastImage
                style={styles.image}
                source={require('../../../resources/images/icons/footer/profile.png')}
                resizeMode={FastImage.resizeMode.contain}
              />              
            </View>
          </TouchableOpacity>
          <TouchableOpacity>
            <View style={styles.buttton}>
              <FastImage
                style={styles.image}
                source={require('../../../resources/images/icons/footer/favorite.png')}
                resizeMode={FastImage.resizeMode.contain}
              /> 
            </View>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => this.setState({callBackShow: true})}>
            <View style={styles.buttton}>
              <FastImage
                style={styles.image}
                source={require('../../../resources/images/icons/footer/callme.png')}
                resizeMode={FastImage.resizeMode.contain}
              /> 
            </View>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => navigation.navigate('Card')}>
            <View style={styles.buttton}>
              <FastImage
                style={styles.image}
                source={require('../../../resources/images/icons/footer/basket.png')}
                resizeMode={FastImage.resizeMode.contain}
              />
            </View>
          </TouchableOpacity>
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  image: {
    height: 40,
    width: 40
  },
  buttton: {
    height: 50,
    width: 50,
    justifyContent: 'center',
    alignItems: 'center'
  },
  container: {
    height: 60,
    justifyContent: 'center',
    backgroundColor: '#fff'    
  },
  shadow: {
    shadowColor: 'rgba(0, 0, 0, 0.1)',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 16,
    elevation: 8,
    position: 'relative'
  },
  view: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center'
  }
})

