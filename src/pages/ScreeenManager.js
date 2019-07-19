import React from 'react'
import { ScrollView, View, Text, Platform, Animated, Easing, StyleSheet } from 'react-native'
import { createDrawerNavigator, createAppContainer, DrawerItems, createStackNavigator } from 'react-navigation'
import { ifIphoneX } from 'react-native-iphone-x-helper'
import FastImage from 'react-native-fast-image'
import Main from './Main/Main'
import Catalog from './Catalog/Catalog'
import ProductView from './Product/ProductView'
import HowOrder from './drawer/HowOrder'
import DeliveryAndPay from './drawer/DeliveryAndPay'
import AboutApp from './drawer/AboutApp'
import Vacancy from './drawer/Vacancy'
import Contact from './drawer/Contact'
import Card from './Card'
import Favorite from './Favorite/Favorite'
import { w } from '../constants/global'

const CustomDrawerComponent = (props) => (
  <View style={{ flex: 1 }}>
    <View style={{ ...ifIphoneX({
      height: 240
    }, {
      height: 210
    }),
    backgroundColor: '#FAFAFA', 
    alignItems: 'center', 
    justifyContent: 'center'}} 
    >
      <Text>LOGO</Text>
    </View>
    <ScrollView style={{ backgroundColor: '#FAFAFA'}}>
      <DrawerItems {...props} />
    </ScrollView>
  </View>
)

const CollapseExpand = (index, position) => {
  const inputRange = [index - 1, index, index + 1]
  const opacity = position.interpolate({
    inputRange,
    outputRange: [0, 1, 1]
  })

  const scaleY = position.interpolate({
    inputRange,
    outputRange: ([0, 1, 1])
  })

  return {
    opacity,
    transform: [
      { scaleY }
    ]
  }
}

const SlideFromRight = (index, position, width) => {
  //const inputRange = [index - 1, index, index + 1]
  const translateX = position.interpolate({
    inputRange: [index - 1, index, index + 1],
    outputRange: [width, 0, 0]
  })
  const slideFromRight = { transform: [{ translateX }] }
  return slideFromRight
}

const TransitionConfiguration = () => {
  return {
    transitionSpec: {
      duration: 300,
      easing: Easing.out(Easing.poly(4)),
      timing: Animated.timing,
      useNativeDriver: true
    },
    screenInterpolator: (sceneProps) => {
      const { layout, position, scene } = sceneProps
      const width = layout.initWidth
      const { index, route } = scene
      const params = route.params || {} // <- That's new
      const transition = params.transition || 'default' // <- That's new
      return {
        collapseExpand: CollapseExpand(index, position),
        default: SlideFromRight(index, position, width)
      }[transition]
    }
  }
}

const CatalogStack = createStackNavigator(
  {
    Main,
    Catalog,
    ProductView
  },
  {
    initialRouteName: 'Main',
    headerMode: 'none',
    mode: Platform.OS === 'ios' ? 'modal' : 'card'
    //transitionConfig: TransitionConfiguration
  }
)

const styles = StyleSheet.create({
  image: {
    height: 30,
    width: 30
  }
})

const Screens = createDrawerNavigator({
  Card: {
    screen: Card,
    navigationOptions: {
      drawerLabel: () => null
    }
  },
  Favorite: {
    screen: Favorite,
    navigationOptions: {
      drawerLabel: () => null
    }
  },
  Main: {
    screen: CatalogStack,
    navigationOptions: {
      drawerLabel: 'Каталог',
      drawerIcon: () => (
        <FastImage
          style={styles.image}
          source={require('../../resources/images/icons/sidemenu/basket2.png')}
          resizeMode={FastImage.resizeMode.contain}
        />
      )
    }
  },
  HowOrder: {
    screen: HowOrder,
    navigationOptions: {
      drawerLabel: 'Как сделать заказ?',
      drawerIcon: () => (
        <FastImage
          style={styles.image}
          source={require('../../resources/images/icons/sidemenu/basket1.png')}
          resizeMode={FastImage.resizeMode.contain}
        />
      )
    }
  },
  DeliveryAndPay: {
    screen: DeliveryAndPay,
    navigationOptions: {
      drawerLabel: 'Доставка и оплата',
      drawerIcon: () => (
        <FastImage
          style={styles.image}
          source={require('../../resources/images/icons/sidemenu/delivery.png')}
          resizeMode={FastImage.resizeMode.contain}
        />
      )
    }
  },
  AboutApp: {
    screen: AboutApp,
    navigationOptions: {
      drawerLabel: 'О приложении',
      drawerIcon: () => (
        <FastImage
          style={styles.image}
          source={require('../../resources/images/icons/sidemenu/info.png')}
          resizeMode={FastImage.resizeMode.contain}
        />
      )
    }
  },
  Vacancy: {
    screen: Vacancy,
    navigationOptions: {
      drawerLabel: 'Вакансии',
      drawerIcon: () => (
        <FastImage
          style={styles.image}
          source={require('../../resources/images/icons/sidemenu/info2.png')}
          resizeMode={FastImage.resizeMode.contain}
        />
      )
    }
  },
  Contact: {
    screen: Contact,
    navigationOptions: {
      drawerLabel: 'Контакты',
      drawerIcon: () => (
        <FastImage
          style={styles.image}
          source={require('../../resources/images/icons/sidemenu/callme.png')}
          resizeMode={FastImage.resizeMode.contain}
        />
      )
    }
  }
},
{
  initialRouteName: 'Main',
  drawerWidth: w * 0.8,
  contentOptions: {
    activeTintColor: '#FF6E36',
    inactiveTintColor: 'rgba(0, 0, 0, 0.54)',
    activeBackgroundColor: '#FFFFFF',
    cityName: this.props,
    itemsContainerStyle: {
      backgroundColor: '#FAFAFA'
    },
    labelStyle: { fontSize: 14, fontFamily: 'CenturyGothic', color: 'rgba(23, 7, 1, 0.87)' }
  },
  contentComponent: CustomDrawerComponent
 
})

export default createAppContainer(Screens)
