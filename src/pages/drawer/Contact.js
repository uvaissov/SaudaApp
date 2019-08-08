import React, {Component} from 'react'
import axios from 'axios'
import { StyleSheet, View, ScrollView, Text } from 'react-native'
import FastImage from 'react-native-fast-image'
import Header from '../../components/main/Header'
import Footer from '../../components/main/Footer'
import CustomStatusBar from '../../components/CustomStatusBar'
import DelivaryView from './view/DelivaryView'
import { WHITE, hostName, BG_COLOR, normalize, FONT, w } from '../../constants/global'

class Contact extends Component {
  state = {
    
  }
  async componentDidMount() {
    const data = await this.getData()
    this.setState(data)
  }

  getData = async () => {
    try {
      const { data } = await axios.get(`${hostName}/api/v1/contacts`)
      const { id, address, fphone, sphone, email, schedule, location } = data
      return { id, address, fphone, sphone, email, schedule, location }
    } catch (error) {
      return { items: [], error }
    }
  }

  _renderItem = (item) => {
    return <DelivaryView item={item} />
  }
  render() {
    const { navigation } = this.props 
    const { address, fphone, sphone, email, schedule, location } = this.state   
    return (
      <View style={[styles.container]}>
        <CustomStatusBar backgroundColor="#fff" barStyle="dark-content" />
        <Header onPress={() => navigation.openDrawer()} navigation={navigation} />
        <View style={styles.cardTitleView}><Text style={styles.cardTitleText} >Контакты</Text></View>
        <ScrollView showsVerticalScrollIndicator={false} style={styles.scrollView}>          
          <View style={{flex: 1, backgroundColor: BG_COLOR}} >
            <View style={{height: 250, width: w }} >
              <FastImage
                style={[{height: 250, width: w }]}
                source={require('../../../resources/images/map.png')}
                resizeMode={FastImage.resizeMode.stretch}
              />
            </View>
            <View style={styles.rowCont}>
              <FastImage
                style={[styles.image]}
                source={require('../../../resources/images/icons/location.png')}
                resizeMode={FastImage.resizeMode.contain}
              />
              <Text style={styles.text}>{address}</Text>
            </View>
            <View style={styles.rowCont}>
              <FastImage
                style={[styles.image]}
                source={require('../../../resources/images/icons/callmegreen.png')}
                resizeMode={FastImage.resizeMode.contain}
              />
              <View>
                <Text style={styles.text}>{fphone}</Text>
                <Text style={styles.text}>{sphone}</Text>
              </View>              
            </View>
            <View style={styles.rowCont}>
              <FastImage
                style={[styles.image]}
                source={require('../../../resources/images/icons/mail.png')}
                resizeMode={FastImage.resizeMode.contain}
              />
              <Text style={styles.text}>{email}</Text>
            </View>
            <View style={styles.rowCont}>
              <FastImage
                style={[styles.image]}
                source={require('../../../resources/images/icons/clock.png')}
                resizeMode={FastImage.resizeMode.contain}
              />
              <Text style={styles.text}>{schedule}</Text>
            </View>
          </View>
        </ScrollView>
        <Footer navigation={navigation} />
      </View>
    )
  }
}

const styles = StyleSheet.create({
  text: {
    marginLeft: 10,
    fontFamily: FONT,
    fontSize: normalize(12)
  },
  image: {
    width: 30,
    height: 30,
    marginHorizontal: 5
    //marginVertical: 10
  },
  rowCont: {
    flexDirection: 'row',
    paddingHorizontal: 10,
    marginTop: 20
  },
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
  }
})

export default Contact
