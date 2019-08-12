import React, {Component} from 'react'
import { StyleSheet, View, TouchableOpacity, Text } from 'react-native'
import { connect } from 'react-redux'
import FastImage from 'react-native-fast-image'
import Login from '../../components/modals/Login'
import Registration from '../../components/modals/Registration'
import Callback from '../../components/modals/Callback'
import { RED, FONT, WHITE, normalize } from '../../constants/global'
import CallBackIntro from '../modals/CallBackIntro'

class Footer extends Component {
  state={
    loginShow: false,
    regShow: false,
    callBackShow: false,
    callBackIntroShow: false
  }

  componentDidMount() {
    if (this.props.onRef) {
      this.props.onRef(this)
    }
  }

  componentWillUnmount() {
    if (this.props.onRef) {
      this.props.onRef(undefined)
    }
  }

  createAccountClick = () => {
    this.setState({loginShow: false})
    const me = this
    setTimeout(() => { me.setState({regShow: true}) }, 500)    
  }

  clickRemember = () => {
    const { navigation } = this.props
    this.setState({loginShow: false})
    navigation.navigate('Remember')
  }

  clickCallBack = () => {
    this.setState({callBackIntroShow: false})
    const me = this
    setTimeout(() => { me.setState({callBackShow: true}) }, 500)    
  }

  profileClick = () => {
    const { token, navigation } = this.props
    console.log(this.props)
    if (!token) {
      this.setState({loginShow: true})
    } else {
      navigation.navigate('Profile')
    }
  }
  
  render() {
    const { loginShow, regShow, callBackShow, callBackIntroShow } = this.state
    const { navigation, items } = this.props
    return (
      <View style={[styles.container, styles.shadow]}>
        <Login visibility={loginShow} hide={() => this.setState({loginShow: false})} reg={() => this.createAccountClick()} remember={() => this.clickRemember()} />           
        <Registration visibility={regShow} hide={() => this.setState({regShow: false})} />
        <Callback visibility={callBackShow} hide={() => this.setState({callBackShow: false})} />
        <CallBackIntro callback={() => this.clickCallBack()} visibility={callBackIntroShow} hide={() => this.setState({callBackIntroShow: false})} />
        <View style={styles.view}>
          <TouchableOpacity onPress={() => this.profileClick()}>
            <View style={styles.buttton}>
              <FastImage
                style={styles.image}
                source={require('../../../resources/images/icons/footer/profile.png')}
                resizeMode={FastImage.resizeMode.contain}
              />              
            </View>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => navigation.navigate('Favorite')}>
            <View style={styles.buttton}>
              <FastImage
                style={styles.image}
                source={require('../../../resources/images/icons/footer/favorite.png')}
                resizeMode={FastImage.resizeMode.contain}
              /> 
            </View>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => this.setState({callBackIntroShow: true})}>
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
              {items && items.length > 0 &&
              (<View style={styles.cardCountView}>
                <Text style={styles.cardCountText}>{items.length}</Text>
              </View>)
              }
            </View>
          </TouchableOpacity>
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  cardCountView: {
    position: 'absolute', 
    right: 0, 
    top: 0, 
    height: 20, 
    width: 20, 
    borderRadius: 10, 
    backgroundColor: RED,
    alignItems: 'center',
    justifyContent: 'center'
  },
  cardCountText: {
    fontFamily: FONT,
    color: WHITE,
    fontSize: normalize(10)
  },
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

const mapStateToProps = state => {
  return {
    items: state.card.items,
    token: state.auth.token
  }
}
export default connect(mapStateToProps, { })(Footer)
