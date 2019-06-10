import React from 'react'
import { ScrollView, View, Text, Platform, Animated, Easing } from 'react-native'
import { createDrawerNavigator, createAppContainer, DrawerItems, createStackNavigator } from 'react-navigation'
import { ifIphoneX } from 'react-native-iphone-x-helper'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import Catalog from './Catalog'
import HowOrder from './drawer/HowOrder'
import DeliveryAndPay from './drawer/DeliveryAndPay'
import AboutApp from './drawer/AboutApp'
import Vacancy from './drawer/Vacancy'
import Contact from './drawer/Contact'
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
    Catalog
  },
  {
    initialRouteName: 'Catalog',
    headerMode: 'none',
    mode: Platform.OS === 'ios' ? 'modal' : 'card',
    transitionConfig: TransitionConfiguration
  }
)

const Screens = createDrawerNavigator({
  Catalog: {
    screen: CatalogStack,
    navigationOptions: {
      drawerLabel: 'Каталог',
      drawerIcon: ({ tintColor }) => (
        <MaterialIcons name="home" size={24} style={{ color: tintColor }} />
      )
    }
  },
  HowOrder: {
    screen: HowOrder,
    navigationOptions: {
      drawerLabel: 'Как сделать заказ?',
      drawerIcon: ({ tintColor }) => (
        <MaterialIcons name="favorite" size={24} style={{ color: tintColor }} />
      )
    }
  },
  DeliveryAndPay: {
    screen: DeliveryAndPay,
    navigationOptions: {
      drawerLabel: 'Доставка и оплата',
      drawerIcon: ({ tintColor }) => (
        <MaterialIcons name="room" size={24} style={{ color: tintColor }} />
      )
    }
  },
  AboutApp: {
    screen: AboutApp,
    navigationOptions: {
      drawerLabel: 'О приложении',
      drawerIcon: ({ tintColor }) => (
        <MaterialIcons name="room" size={24} style={{ color: tintColor }} />
      )
    }
  },
  Vacancy: {
    screen: Vacancy,
    navigationOptions: {
      drawerLabel: 'Вакансии',
      drawerIcon: ({ tintColor }) => (
        <MaterialIcons name="work" size={24} style={{ color: tintColor }} />
      )
    }
  },
  Contact: {
    screen: Contact,
    navigationOptions: {
      drawerLabel: 'Контакты',
      drawerIcon: ({ tintColor }) => (
        <MaterialIcons name="message" size={24} style={{ color: tintColor }} />
      )
    }
  }
},
{
  initialRouteName: 'Catalog',
  drawerWidth: w * 0.8,
  contentOptions: {
    activeTintColor: '#FF6E36',
    inactiveTintColor: 'rgba(0, 0, 0, 0.54)',
    activeBackgroundColor: '#FFFFFF',
    cityName: this.props,
    itemsContainerStyle: {
      backgroundColor: '#FAFAFA'
    },
    labelStyle: { fontSize: 14, fontFamily: 'Roboto-Regular', fontWeight: 'normal', fontStyle: 'normal', color: 'rgba(23, 7, 1, 0.87)' }
  },
  contentComponent: CustomDrawerComponent
 
})

export default createAppContainer(Screens)
