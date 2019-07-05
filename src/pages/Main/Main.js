import React, {Component} from 'react'
import { StyleSheet, View, ScrollView} from 'react-native'
import Header from '../../components/main/Header'
import Footer from '../../components/main/Footer'
import CustomStatusBar from '../../components/CustomStatusBar'
import SliderApp from './view/Slider'

export default class Main extends Component {
  state={
    loginShow: false
  }
  render() {
    const { navigation } = this.props
    return (
      <View style={styles.container}>
        <CustomStatusBar backgroundColor="white" barStyle="dark-content" />
        <Header onPress={() => navigation.openDrawer()} />
        <ScrollView style={styles.scrollView}>
          <View style={styles.bodyView}>
            <SliderApp data={[{id: 3, img: require('../../../resources/images/img/main_slide_1.png')}, {id: 1, img: require('../../../resources/images/img/main_slide_1.png')}]} />
          </View>
        </ScrollView>        
        <Footer />
      </View>
    )
  }
}

const styles = StyleSheet.create({
  welcome: {
    fontFamily: 'gothic',
    fontWeight: 'bold'
  },
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
