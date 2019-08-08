import React from 'react'
import { ScrollView, View, Platform, StyleSheet, TouchableWithoutFeedback } from 'react-native'
import { createDrawerNavigator, createAppContainer, DrawerItems, createStackNavigator } from 'react-navigation'
import { ifIphoneX } from 'react-native-iphone-x-helper'
import FastImage from 'react-native-fast-image'
import Main from './Main/Main'
import Catalog from './Catalog/Catalog'
import Search from './Catalog/Search'
import ProductView from './Product/ProductView'
import HowOrder from './drawer/HowOrder'
import DeliveryAndPay from './drawer/DeliveryAndPay'
import AboutApp from './drawer/AboutApp'
import Vacancy from './drawer/Vacancy'
import Contact from './drawer/Contact'
import Card from './Card'
import Favorite from './Favorite/Favorite'
import Profile from './Profile/Profile'
import Remember from './Profile/Remember'
import ChangePassword from './Profile/ChangePassword'
import MyOrders from './MyOrders/MyOrders'
import { w, WHITE, FONT, normalize } from '../constants/global'
import { SocialLinks } from './SocialLinks'

const CustomDrawerComponent = (props) => (
  <View style={{ flex: 1 }}>
    <View style={{ ...ifIphoneX({
      height: 240
    }, {
      height: 210
    }),
    backgroundColor: WHITE, 
    alignItems: 'center', 
    justifyContent: 'center'}} 
    >
      <TouchableWithoutFeedback onPress={() => props.navigation.navigate('Main')}>
        <FastImage
          style={[{height: 150, width: 200 }]}
          source={require('../../resources/images/logo.png')}
          resizeMode={FastImage.resizeMode.contain}
        />
      </TouchableWithoutFeedback>
    </View>
    <ScrollView style={{ backgroundColor: WHITE}}>
      <DrawerItems {...props} />      
    </ScrollView>
    <SocialLinks />
  </View>
)
/*
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
*/

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

const CardStack = createStackNavigator(
  {
    Card,
    ProductView
  },
  {
    initialRouteName: 'Card',
    headerMode: 'none',
    mode: Platform.OS === 'ios' ? 'modal' : 'card'
    //transitionConfig: TransitionConfiguration
  }
)

const FavStack = createStackNavigator(
  {
    Favorite,
    ProductView
  },
  {
    initialRouteName: 'Favorite',
    headerMode: 'none',
    mode: Platform.OS === 'ios' ? 'modal' : 'card'
    //transitionConfig: TransitionConfiguration
  }
)

const SearchStack = createStackNavigator(
  {
    Search,
    ProductView
  },
  {
    initialRouteName: 'Search',
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
    screen: CardStack,
    navigationOptions: {
      drawerLabel: () => null
    }
  },
  Favorite: {
    screen: FavStack,
    navigationOptions: {
      drawerLabel: () => null
    }
  },
  Profile: {
    screen: Profile,
    navigationOptions: {
      drawerLabel: () => null
    }
  },
  Remember: {
    screen: Remember,
    navigationOptions: {
      drawerLabel: () => null
    }
  },
  ChangePassword: {
    screen: ChangePassword,
    navigationOptions: {
      drawerLabel: () => null
    }
  },
  MyOrders: {
    screen: MyOrders,
    navigationOptions: {
      drawerLabel: () => null
    }
  },
  Search: {
    screen: SearchStack,
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
      backgroundColor: '#FFFFFF'
    },
    labelStyle: { fontSize: normalize(13), fontFamily: FONT, color: 'rgba(23, 7, 1, 0.87)', fontWeight: 'normal' }
  },
  contentComponent: CustomDrawerComponent
 
})

export default createAppContainer(Screens)
