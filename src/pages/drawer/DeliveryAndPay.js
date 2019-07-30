import React, {Component} from 'react'
import axios from 'axios'
import { StyleSheet, View, ScrollView} from 'react-native'
import Header from '../../components/main/Header'
import Footer from '../../components/main/Footer'
import CustomStatusBar from '../../components/CustomStatusBar'
import DelivaryView from './view/DelivaryView'
import { WHITE, hostName, BG_COLOR } from '../../constants/global'
import { HeaderButtonDelivery } from './view/HeaderButtonDelivery'

class DeliveryAndPay extends Component {
  state = {
    items: [],
    selected: 0
  }
  async componentDidMount() {
    const data = await this.getData()
    this.setState(data)
  }

  getData = async () => {
    try {
      const { data } = await axios.get(`${hostName}/api/v1/delivery`)
      return { items: data.map(({ title, content }) => ({ title, content }))}
    } catch (error) {
      return { items: [], error }
    }
  }

  _renderItem = (item) => {
    return <DelivaryView item={item} />
  }
  render() {
    const { navigation } = this.props 
    const { items, selected } = this.state   
    return (
      <View style={[styles.container]}>
        <CustomStatusBar backgroundColor="#fff" barStyle="dark-content" />
        <Header onPress={() => navigation.openDrawer()} />
        <HeaderButtonDelivery selected={selected} onPress={(index) => this.setState({ selected: index })} />
        <ScrollView showsVerticalScrollIndicator={false} style={styles.scrollView}>          
          <View style={{paddingHorizontal: 1}}>
            {
              items.length > 0 &&
              this._renderItem(items[selected])
            }
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
    justifyContent: 'flex-start',
    backgroundColor: WHITE
  },
  scrollView: {
    flex: 1,
    backgroundColor: BG_COLOR 
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

export default DeliveryAndPay
