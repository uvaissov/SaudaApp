import React, {Component} from 'react'
import { StyleSheet, View, ScrollView, FlatList} from 'react-native'
//import _ from 'lodash'
import { connect } from 'react-redux'
import { searchQuery } from './actions'
import { addToCard, getCard } from '../Card/actions'
import Header from '../../components/main/Header'
import Footer from '../../components/main/Footer'
import CustomStatusBar from '../../components/CustomStatusBar'
import ItemRowView from './view/ItemRowView'
import ItemFooter from './view/ItemFooter'
import ProductAdded from '../../components/modals/ProductAdded'
import Loader from '../../components/Loader'
import { normalize } from '../../constants/global'

class Search extends Component {
  state={
    productAddShow: false
  }

  async componentDidMount() {
    console.log('dm')
  }

   _addToCard = async (id, q) => {
     await this.props.addToCard(id, q)
     this.setState({productAddShow: true})
     this.props.getCard()
   }

   _onPagePress = (page) => {
     this.props.searchQuery(page)
   }

  _renderItem =({ item }) => {
    const { navigation } = this.props
    return (<ItemRowView item={item} onCardPress={this._addToCard} onPress={() => navigation.push('ProductView', { product: item })} />)
  }

  _renderFooter= () => {
    const { s_current_page, s_last_page } = this.props
    return (<ItemFooter current_page={s_current_page} last_page={s_last_page} elementCount={4} onPagePress={this._onPagePress} />)
  }

  _renderFlat = () => {
    const { s_items, s_isLoadingItems } = this.props

    if (s_isLoadingItems === true) {
      return (<Loader animating={!s_isLoadingItems} />)
    }
    return (
      <FlatList 
        data={s_items}
        renderItem={this._renderItem}
        keyExtractor={(item) => item.id}
        ListFooterComponent={this._renderFooter}
      />
    )
  }
  
  render() {
    const { navigation } = this.props
    const { productAddShow} = this.state

    return (
      <View style={styles.container}>
        <CustomStatusBar backgroundColor="#fff" barStyle="dark-content" />        
        <Header onPress={() => navigation.openDrawer()} navigation={navigation} />
        <ProductAdded navigation={navigation} visibility={productAddShow} hide={() => this.setState({productAddShow: false})} />
        <ScrollView style={styles.scrollView}>
          {this._renderFlat()}          
        </ScrollView>        
        <Footer navigation={navigation} />
      </View>
    )
  }
}

const styles = StyleSheet.create({
  listHeaderView: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 10
  },
  headerText: {
    fontFamily: 'ElowenCaps',
    fontSize: normalize(32),
    textAlign: 'center',
    textTransform: 'uppercase',
    marginTop: 10
  },
  container: {
    justifyContent: 'flex-start',
    flex: 1    
  },
  scrollView: {
    flex: 1,
    backgroundColor: '#F9F9F9',
    padding: 25
  },
  bodyView: {
    flex: 1,
    justifyContent: 'flex-start'
  }
})

const mapStateToProps = state => {
  return {
    s_items: state.catalog.s_items,
    s_isLoadingItems: state.catalog.s_isLoadingItems,
    s_current_page: state.catalog.s_current_page,
    s_last_page: state.catalog.s_last_page
  }
}
export default connect(mapStateToProps, { addToCard, getCard, searchQuery })(Search)
