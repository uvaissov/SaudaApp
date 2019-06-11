import React, {Component} from 'react'
import { StyleSheet, Text, View, ScrollView} from 'react-native'
import Header from '../components/main/Header'
import Footer from '../components/main/Footer'

export default class App extends Component {
  render() {
    const { navigation } = this.props
    return (
      <View style={styles.container}>
        <Header onPress={() => navigation.openDrawer()} />
        <ScrollView style={styles.scrollView}>
          <View style={styles.bodyView}>
            <Text style={styles.welcome}>Hello SaudaApp</Text>
          </View>
        </ScrollView>  
        <Footer onPress={() => navigation.openDrawer()} />
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
