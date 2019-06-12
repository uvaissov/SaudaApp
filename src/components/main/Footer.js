import React, {Component} from 'react'
import { StyleSheet, View, TouchableOpacity } from 'react-native'
import Ionicons from 'react-native-vector-icons/Ionicons'
import Login from '../../components/modals/Login'

export default class Footer extends Component {
  state={
    loginShow: false
  }
  render() {
    const { loginShow } = this.state
    return (
      <View style={[styles.container, styles.shadow]}>
        <Login visibility={loginShow} hide={() => this.setState({loginShow: false})} />           
        <View style={styles.view}>
          <TouchableOpacity onPress={() => this.setState({loginShow: true})}>
            <View style={styles.buttton}>
              <Ionicons name="ios-home" size={40} color="#67cf70" />              
            </View>
          </TouchableOpacity>
          <TouchableOpacity>
            <View style={styles.buttton}>
              <Ionicons name="ios-home" size={40} color="#67cf70" />
            </View>
          </TouchableOpacity>
          <TouchableOpacity>
            <View style={styles.buttton}>
              <Ionicons name="ios-home" size={40} color="#67cf70" />
            </View>
          </TouchableOpacity>
          <TouchableOpacity>
            <View style={styles.buttton}>
              <Ionicons name="ios-home" size={40} color="#67cf70" />
            </View>
          </TouchableOpacity>
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
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

