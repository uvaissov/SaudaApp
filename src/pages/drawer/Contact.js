import React, {Component} from 'react'
import axios from 'axios'
import { StyleSheet, View, ScrollView, Text } from 'react-native'
import FastImage from 'react-native-fast-image'
import MapView, { PROVIDER_GOOGLE, Marker } from 'react-native-maps'
import Header from '../../components/main/Header'
import Footer from '../../components/main/Footer'
import CustomStatusBar from '../../components/CustomStatusBar'
import DelivaryView from './view/DelivaryView'
import { WHITE, hostName, BG_COLOR, normalize, FONT, w } from '../../constants/global'

class Contact extends Component {
  state = {
    //lat: 43.251888,
    //long: 126.888429
  }
  async componentDidMount() {
    const data = await this.getData()
    console.log(data)
    this.setState(data)
  }

  getData = async () => {
    try {
      const { data } = await axios.get(`${hostName}/api/v1/contacts`)
      const { id, address, fphone, sphone, email, schedule, location } = data
      const [lat, long] = location.split(',')
      const result = { id, address, fphone, sphone, email, schedule, lat: parseFloat(lat), long: parseFloat(long) }
      return result
    } catch (error) {
      return { items: [], error }
    }
  }

  _renderItem = (item) => {
    return <DelivaryView item={item} />
  }
  render() {
    const { navigation } = this.props 
    const { address, fphone, sphone, email, schedule, lat, long } = this.state   
    return (
      <View style={[styles.container]}>
        <CustomStatusBar backgroundColor="#fff" barStyle="dark-content" />
        <Header onPress={() => navigation.openDrawer()} navigation={navigation} />
        <View style={styles.cardTitleView}><Text style={styles.cardTitleText} >Контакты</Text></View>
        <ScrollView showsVerticalScrollIndicator={false} style={styles.scrollView}>          
          <View style={{flex: 1, backgroundColor: BG_COLOR}} >
            <View style={{height: 250, width: w }} >
              {
                lat && long &&
                (
                  <MapView
                    provider={PROVIDER_GOOGLE}
                    style={styles.map}
                    initialRegion={{
                      latitude: lat,
                      longitude: long,
                      latitudeDelta: 0.01his122,
                      longitudeDelta: 0.00121
                    }}
                  >
                    <Marker
                      coordinate={{latitude: lat, longitude: long}}
                      title={'123'}
                      description={'wqwe'}
                    />
                  </MapView>
                )
              }
              
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
  },
  map: {
    ...StyleSheet.absoluteFillObject
  }
})

export default Contact
