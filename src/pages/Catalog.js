import React, {Component} from 'react'
import { StyleSheet, Text, View, ScrollView} from 'react-native'
import Header from '../components/main/Header'
import Footer from '../components/main/Footer'
import CustomStatusBar from '../components/CustomStatusBar'

export default class App extends Component {
  state={
    loginShow: false
  }
  render() {
    const { navigation } = this.props
    return (
      <View style={styles.container}>
        <CustomStatusBar backgroundColor="#fff" barStyle="dark-content" />
        <Header onPress={() => navigation.openDrawer()} />
        <ScrollView style={styles.scrollView}>
          <View style={styles.bodyView}>
            <Text style={styles.welcome}>Hello SaudaApp</Text>            
          </View>
        </ScrollView>        
        <Footer />
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1    
  },
  scrollView: {
    flex: 1
  },
  bodyView: {
    flex: 1,
    justifyContent: 'flex-start'
  }
})
