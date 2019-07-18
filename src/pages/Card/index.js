import React, {Component} from 'react'
import { StyleSheet, Text, View, ScrollView, FlatList } from 'react-native'
//import axios from 'axios'
import { connect } from 'react-redux'
import Header from '../../components/main/Header'
import Footer from '../../components/main/Footer'
import ItemRowView from '../Catalog/view/ItemRowView'
import CustomStatusBar from '../../components/CustomStatusBar'
import { } from '../../constants/global'
import Loader from '../../components/Loader'
import { } from '../../transform'

class Card extends Component {
  state={
    isLoading: true,
    productAddShow: false,
    item: null,
    count: 1,
    oftenBuy: []
  }
  async componentDidMount() {
    console.log('Card dm')
  }

  _renderItem =({ item }) => {
    const { navigation } = this.props
    return (<ItemRowView item={item} onCardPress={() => this.setState({productAddShow: true})} onPress={() => navigation.push('ProductView', { product: item })} />)
  }

  _renderFlat = () => {
    const { items } = this.props
    return (
      <FlatList 
        data={items}
        renderItem={this._renderItem}
        keyExtractor={(item) => item.id}
      />
    )
  }
  render() {
    const { navigation, isLoadingItems } = this.props
    if (isLoadingItems === true) {
      return (<Loader animating={!isLoadingItems} />)
    }
    return (
      <View style={[styles.container]}>
        <CustomStatusBar backgroundColor="#fff" barStyle="dark-content" />
        <Header onPress={() => navigation.openDrawer()} />
        <ScrollView showsVerticalScrollIndicator={false} style={styles.scrollView}>
          <View><Text>Корзина товаров</Text></View>                  
          {this._renderFlat()}
        </ScrollView>
        <Footer />
      </View>
    )
  }
}

const styles = StyleSheet.create({
  imgView: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingBottom: 25
  },
  bodyView: {
    paddingHorizontal: 25
  },
  favoritePos: {
    position: 'absolute', 
    top: 15, 
    right: 25,
    zIndex: 20
  },
  itemDesc: {    
    fontFamily: 'CenturyGothic',
    fontSize: 16,
    color: 'rgba(0,0,0,0.7)',
    marginTop: 10   
  },
  itemDescFull: {    
    fontFamily: 'CenturyGothic',
    fontSize: 14,
    color: 'rgba(0,0,0,0.8)'
  },
  itemTitle: {    
    fontFamily: 'CenturyGothic',
    fontSize: 19,
    color: 'rgba(0,0,0,0.7)',
    textTransform: 'uppercase'
  },
  itemPriceText: {
    fontFamily: 'CenturyGothic',
    fontSize: 16,
    color: '#FF798D',
    marginTop: 10   
  },
  container: {
    flex: 1,
    justifyContent: 'flex-start'
  },
  scrollView: {
    //margin: 25,
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

const mapStateToProps = state => {
  return {
    items: state.card.items,
    isLoadingItems: state.catalog.isLoadingItems
  }
}
export default connect(mapStateToProps, { })(Card)
