import React, {Component} from 'react'
import { StyleSheet, View, ScrollView} from 'react-native'
import { connect } from 'react-redux'
import { getCategories, getCities } from './actions'
import { getCard } from '../Card/actions'
import { init } from '../Auth/actions'
import Header from '../../components/main/Header'
import Footer from '../../components/main/Footer'
import CustomStatusBar from '../../components/CustomStatusBar'
import SliderApp from './view/Slider'
import CategorySlider from './view/CategorySlider'
import Loader from '../../components/Loader'

class Main extends Component {
  state={
    loginShow: false
  }
  async componentDidMount() {
    this.props.getCategories()
    await this.props.getCities()
    //init call after city putted to reduce
    await this.props.init()
    this.props.getCard()
  }
  render() {
    const { navigation, categories, isLoading } = this.props

    if (isLoading === true) {
      return <Loader animating={!isLoading} color={'black'} />
    }

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
        <Footer navigation={navigation} />
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
  return {
    categories: state.main.categories,
    isLoading: state.main.isLoading
  }
}
export default connect(mapStateToProps, { init, getCategories, getCities, getCard })(Main)
