import React, {Component} from 'react'
import axios from 'axios'
import { StyleSheet, Text, View, FlatList, ScrollView} from 'react-native'
import Header from '../../components/main/Header'
import Footer from '../../components/main/Footer'
import CustomStatusBar from '../../components/CustomStatusBar'
import ItemFooter from '../Catalog/view/ItemFooter'
import FaqView from './view/FaqView'
import { WHITE, RED, BLACK, FONT, BG_COLOR, normalize, hostName } from '../../constants/global'

class HowOrder extends Component {
  state = {
    items: [],
    current_page: undefined, 
    last_page: undefined
  }
  async componentDidMount() {
    const data = await this.getData(1)
    this.setState(data)
  }

  getData = async (page) => {
    try {
      const { data } = await axios.get(`${hostName}/api/v1/faqs?page=${page}`)
      const { current_page, last_page, data: array } = data
      return { current_page, last_page, items: array.map(({ id, question, answer}) => ({ id, question, answer }))}
    } catch (error) {
      return { items: [], error }
    }
  }

  toPage = async (page) => {
    const data = await this.getData(page)
    this.setState(data)
  }

  _renderItem = ({item}) => {
    return <FaqView item={item} />
  }
  render() {
    const { navigation } = this.props 
    const { items, current_page, last_page } = this.state   
    return (
      <View style={[styles.container]}>
        <CustomStatusBar backgroundColor="#fff" barStyle="dark-content" />
        <Header onPress={() => navigation.openDrawer()} />
        <View style={styles.cardTitleView}><Text style={styles.cardTitleText} >Частые вопросы</Text></View>                  
        <ScrollView showsVerticalScrollIndicator={false} style={styles.scrollView}>          
          <FlatList 
            style={{paddingHorizontal: 20}}
            data={items}
            renderItem={this._renderItem}
            keyExtractor={(item) => item.id}
            ListFooterComponent={() => (<ItemFooter current_page={current_page} last_page={last_page} elementCount={4} onPagePress={(page) => this.toPage(page)} />)}
          />              
        </ScrollView>
        <Footer navigation={navigation} />
      </View>
    )
  }
}

const styles = StyleSheet.create({
  buttonView: {
    alignItems: 'center', paddingVertical: 15
  },
  cardTitleView: {
    backgroundColor: WHITE,
    marginBottom: 15,
    marginTop: 10,
    paddingLeft: 25,
    paddingVertical: 5
  },
  cardTitleText: {
    textTransform: 'uppercase',
    fontSize: normalize(17),
    fontFamily: FONT
  },
  totalBoxView: {
    backgroundColor: RED,
    paddingVertical: 10,
    paddingHorizontal: 30,
    borderRadius: 30
  },
  totalBoxText: {
    color: WHITE,
    fontSize: normalize(12),
    fontFamily: FONT
  },
  totalBoxTitle: {
    color: BLACK,
    fontFamily: FONT,
    fontSize: normalize(12),
    marginRight: 15
  },
  totalView: {
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: 25,
    marginTop: 10
  },
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    backgroundColor: BG_COLOR
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

export default HowOrder
