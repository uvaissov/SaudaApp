import React, {Component} from 'react'
import { StyleSheet, View, ScrollView, Text} from 'react-native'
import { connect } from 'react-redux'
import SplashScreen from 'react-native-splash-screen'
import FastImage from 'react-native-fast-image'
import { getCategories, getCities, getSliders } from './actions'
import { getCard } from '../Card/actions'
import { init } from '../Auth/actions'
import Header from '../../components/main/Header'
import Footer from '../../components/main/Footer'
import CustomStatusBar from '../../components/CustomStatusBar'
import SliderApp from './view/Slider'
import CategorySlider from './view/CategorySlider'
import Loader from '../../components/Loader'
import { FONT, normalize, RED, WHITE } from '../../constants/global'

class Main extends Component {
  async componentDidMount() {
    this.props.getCategories()
    this.props.getSliders()
    await this.props.getCities()
    //init call after city putted to reduce
    await this.props.init()
    this.props.getCard()
    setTimeout(() => {
      SplashScreen.hide()
    }, 500)
  }
  render() {
    const { navigation, categories, isLoading, sliders, brandSliders } = this.props

    if (isLoading === true) {
      return <Loader />
    }

    return (
      <View style={styles.container}>
        <CustomStatusBar backgroundColor="white" barStyle="dark-content" />
        <Header onPress={() => navigation.openDrawer()} navigation={navigation} />
        <ScrollView style={styles.scrollView}>
          <View style={styles.bodyView}>
            <CategorySlider data={categories} navigation={navigation} />
            <SliderApp navigation={navigation} data={sliders} />
            <View style={styles.whyWeSectionView}>
              <Text style={styles.whyText}>Почему мы?</Text>
              <Text style={styles.whyDecv}>{'Мы сделаем это быстро!\nСоберем и привезем!\nНаши цены ниже чем в магазине!'}</Text> 
            </View>
            <FastImage  
              style={[{ flex: 1, height: 160, width: undefined, justifyContent: 'center', alignItems: 'flex-start' }]} 
              source={require('../../../resources/images/img/whyWe.png')}
              resizeMode={FastImage.resizeMode.contain}
            />
            <SliderApp buttons data={brandSliders} />
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
    backgroundColor: WHITE    
  },
  scrollView: {
    flex: 1
  },
  bodyView: {
    flex: 1,
    justifyContent: 'flex-start'
  },
  whyWeSectionView: {
    marginTop: 20,
    padding: 15
  },
  whyText: {
    fontFamily: 'ElowenCaps',
    fontSize: normalize(32),
    textAlign: 'left',
    textTransform: 'uppercase',
    marginTop: 10,
    color: RED
  },
  whyDecv: {
    textAlign: 'left',    
    fontFamily: FONT,
    marginTop: 15
  }
})

const mapStateToProps = state => {
  return {
    categories: state.main.categories,
    isLoading: state.main.isLoading,
    sliders: state.main.sliders,
    brandSliders: state.main.brandSliders
  }
}
export default connect(mapStateToProps, { init, getCategories, getCities, getCard, getSliders })(Main)
