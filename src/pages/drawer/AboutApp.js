import React, {Component} from 'react'
import axios from 'axios'
import { StyleSheet, View, FlatList, ScrollView} from 'react-native'
import Header from '../../components/main/Header'
import Footer from '../../components/main/Footer'
import CustomStatusBar from '../../components/CustomStatusBar'
import AboutView from './view/AboutView'
import { WHITE, hostName } from '../../constants/global'

class AboutApp extends Component {
  state = {
    items: [],
    current_page: undefined, 
    last_page: undefined
  }
  async componentDidMount() {
    const data = await this.getData()
    this.setState(data)
  }

  getData = async () => {
    try {
      const { data } = await axios.get(`${hostName}/api/v1/about`)
      return { items: data.map(({ title, content }) => ({ title, content }))}
    } catch (error) {
      return { items: [], error }
    }
  }

  _renderItem = ({item}) => {
    return <AboutView item={item} />
  }
  render() {
    const { navigation } = this.props 
    const { items } = this.state   
    return (
      <View style={[styles.container]}>
        <CustomStatusBar backgroundColor="#fff" barStyle="dark-content" />
        <Header onPress={() => navigation.openDrawer()} />
        <ScrollView showsVerticalScrollIndicator={false} style={styles.scrollView}>          
          <FlatList 
            style={{paddingHorizontal: 8}}
            data={items}
            renderItem={this._renderItem}
            keyExtractor={(item) => item.id}
          />              
        </ScrollView>
        <Footer navigation={navigation} />
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    backgroundColor: WHITE
  },
  scrollView: {
    flex: 1
  },
  shadow: {
    shadowColor: 'rgba(48, 25, 0, 0.1)',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 16,
    elevation: 8,
    position: 'relative'

  }
})

export default AboutApp
