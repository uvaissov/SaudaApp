import React, {Component} from 'react'
import { StyleSheet, View, ScrollView} from 'react-native'
import { connect } from 'react-redux'
import Header from '../../components/main/Header'
import Footer from '../../components/main/Footer'
import CustomStatusBar from '../../components/CustomStatusBar'
import SliderApp from './view/Slider'
import CategorySlider from './view/CategorySlider'

class Main extends Component {
  state={
    loginShow: false
  }
  render() {
    const { navigation, categories } = this.props
    return (
      <View style={styles.container}>
        <CustomStatusBar backgroundColor="white" barStyle="dark-content" />
        <Header onPress={() => navigation.openDrawer()} />
        <ScrollView style={styles.scrollView}>
          <View style={styles.bodyView}>
            <CategorySlider data={categories} navigation={navigation} />
            <SliderApp data={[{id: 3, img: require('../../../resources/images/img/main_slide_1.png')}, {id: 1, img: require('../../../resources/images/img/main_slide_1.png')}]} />
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

const mapStateToProps = state => {
  console.log(state)
  return {
    categories: state.main.categories
  }
}
export default connect(mapStateToProps, { })(Main)
