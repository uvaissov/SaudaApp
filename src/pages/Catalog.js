import React, {Component} from 'react'
import { StyleSheet, Text, View} from 'react-native'
import Header from '../components/main/Header'

export default class App extends Component {
  render() {
    const { navigation } = this.props
    return (
      <View style={styles.container}>
        <Header onPress={() => navigation.openDrawer()} />
        <Text style={styles.welcome}>Hello SaudaApp</Text>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start'
  }
})
