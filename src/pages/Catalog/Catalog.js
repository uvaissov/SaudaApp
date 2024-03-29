import React, {Component} from 'react'
import { StyleSheet, Text, View, ScrollView, FlatList} from 'react-native'
import _ from 'lodash'
import { connect } from 'react-redux'
import { getBrands, getProducts, cleanFilters } from './actions'
import { addToCard, getCard } from '../Card/actions'
import Header from '../../components/main/Header'
import Footer from '../../components/main/Footer'
import CustomStatusBar from '../../components/CustomStatusBar'
import CategorySlider from '../Main/view/CategorySlider'
import ItemRowView from './view/ItemRowView'
import ItemFooter from './view/ItemFooter'
import { OutlineOption } from './view/OutlineOption'
import FilterModal from './view/modal/FilterModal'
import SortModal from './view/modal/SortModal'
import ProductAdded from '../../components/modals/ProductAdded'
import Loader from '../../components/Loader'
import { w, normalize } from '../../constants/global'
import CategoryModal from './view/modal/CategoryModal'

class Catalog extends Component {
  state={
    filterShow: false,
    sortShow: false,
    productAddShow: false,
    categoryListshow: false
  }

  componentWillMount() {
    const { navigation, categories } = this.props
    const categoryId = navigation.getParam('categoryId') || navigation.dangerouslyGetParent().getParam('categoryId')
    if (categoryId && categoryId > -1) {
      navigation.setParams({categoryId})
    } else {
      const [first = {}] = categories
      navigation.setParams({categoryId: first.id})
    }
  }

  async componentDidMount() {
    this.props.getBrands()
    this._search()
  }
  async componentDidUpdate(prevProps, prevState) {
    const categoryId = this.props.navigation.getParam('categoryId')
    const prevCategoryId = prevProps.navigation.getParam('categoryId')
    if (categoryId && categoryId !== prevCategoryId) {
      this.props.cleanFilters()
      this._search()
    }
    if (prevState.filterShow === true && this.state.filterShow !== prevState.filterShow) {
      this._search()
    }
    if (prevState.sortShow === true && this.state.sortShow !== prevState.sortShow) {
      this._search()
    }
  }

   _addToCard = async (id, q) => {
     await this.props.addToCard(id, q)
     this.setState({productAddShow: true})
     this.props.getCard()
   }

   _onPagePress = (page) => {
     const categoryId = this.props.navigation.getParam('categoryId')
     this.props.getProducts(categoryId, page)
   }

   _search = () => {
     const { navigation } = this.props
     const categoryId = navigation.getParam('categoryId')
     this.props.getProducts(categoryId, 1)
   }

  _renderItem =({ item }) => {
    const { navigation } = this.props
    return (<ItemRowView item={item} onCardPress={this._addToCard} onPress={() => navigation.push('ProductView', { product: item })} />)
  }

  _renderHeader = () => {
    const categoryId = this.props.navigation.getParam('categoryId')
    const { categories } = this.props
    let name = null
    _.forEach(categories, (item) => {
      const { children } = item
      const [first] = _.filter(children, (e) => e.id === categoryId)
      if (!_.isEmpty(first)) {
        name = first.name
      }
    })

    return (
      <View style={{marginTop: 15}}>
        <OutlineOption style={{width: w - 40}} title={name || 'Категории'} onPress={() => this.setState({categoryListshow: true})} />
        <View style={styles.listHeaderView} >
          <OutlineOption style={{width: w / 2.5}} title="Фильтры" onPress={() => this.setState({filterShow: true})} />
          <OutlineOption style={{width: w / 2.5}} title="Сортировка" onPress={() => this.setState({sortShow: true})} />
        </View>
      </View>
    )
  }

  _renderFooter= () => {
    const { current_page, last_page } = this.props
    return (<ItemFooter current_page={current_page} last_page={last_page} elementCount={4} onPagePress={this._onPagePress} />)
  }

  _renderFlat = () => {
    const { items, isLoadingItems } = this.props

    if (isLoadingItems === true) {
      return (<Loader />)
    }
    return (
      <FlatList 
        data={items}
        renderItem={this._renderItem}
        //ListHeaderComponent={this._renderHeader}
        keyExtractor={(item) => item.id}
        ListFooterComponent={this._renderFooter}
      />
    )
  }
  
  render() {
    const categoryId = this.props.navigation.getParam('categoryId')
    const { navigation, categories } = this.props
    const { filterShow, productAddShow, sortShow, categoryListshow } = this.state
    const [category = {}] = _.filter(categories, (item) => {
      const { children } = item
      const [first = {}] = _.filter(children, (e) => e.id === categoryId)
      if (!_.isEmpty(first)) {
        return true
      }
      return item.id === categoryId 
    })
    const { name, children } = category
    return (
      <View style={styles.container}>
        <CustomStatusBar backgroundColor="#fff" barStyle="dark-content" />        
        <Header onPress={() => navigation.openDrawer()} navigation={navigation} />
        <ProductAdded navigation={navigation} visibility={productAddShow} hide={() => this.setState({productAddShow: false})} />
        <FilterModal visibility={filterShow} hide={() => this.setState({filterShow: false})} />
        <SortModal visibility={sortShow} hide={() => this.setState({sortShow: false})} />
        <CategoryModal categoryId={categoryId} data={children} visibility={categoryListshow} hide={() => this.setState({categoryListshow: false})} navigation={navigation} />
        <CategorySlider data={categories} navigation={navigation} />
        <ScrollView style={styles.scrollView}>          
          <View style={styles.bodyView}>            
            <Text style={styles.headerText}>{name}</Text>
          </View>
          {this._renderHeader()}
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
    paddingHorizontal: 20
  },
  bodyView: {
    flex: 1,
    justifyContent: 'flex-start'
  }
})

const mapStateToProps = state => {
  return {
    categories: state.main.categories,
    items: state.catalog.items,
    isLoadingItems: state.catalog.isLoadingItems,
    current_page: state.catalog.current_page,
    last_page: state.catalog.last_page
  }
}
export default connect(mapStateToProps, { getBrands, getProducts, addToCard, getCard, cleanFilters })(Catalog)
