import React, {Component} from 'react'
import { StyleSheet, Text, View, ScrollView, FlatList} from 'react-native'
import { connect } from 'react-redux'
import { getBrands, getProducts } from './actions'
import { addToCard, getCard } from '../Card/actions'
import Header from '../../components/main/Header'
import Footer from '../../components/main/Footer'
import CustomStatusBar from '../../components/CustomStatusBar'
import CategorySlider from '../Main/view/CategorySlider'
import ItemRowView from './view/ItemRowView'
import ItemFooter from './view/ItemFooter'
import { OutlineOption } from './view/OutlineOption'
import FilterModal from './view/modal/FilterModal'
import ProductAdded from '../../components/modals/ProductAdded'
import Loader from '../../components/Loader'
import { w } from '../../constants/global'

class Catalog extends Component {
  state={
    filterShow: false,
    productAddShow: false
  }

  async componentDidMount() {
    this.props.getBrands()
    const categoryId = this.props.navigation.getParam('categoryId')
    this.props.getProducts(categoryId)
  }
  componentDidUpdate(prevProps/*, prevState*/) {
    const categoryId = this.props.navigation.getParam('categoryId')
    const prevCategoryId = prevProps.navigation.getParam('categoryId')
    if (categoryId && categoryId !== prevCategoryId) {
      this.props.getProducts(categoryId)
    }
  }

   _addToCard = async (id, q) => {
     await this.props.addToCard(id, q)
     this.setState({productAddShow: true})
     this.props.getCard()
   }

  _renderItem =({ item }) => {
    const { navigation } = this.props
    return (<ItemRowView item={item} onCardPress={this._addToCard} onPress={() => navigation.push('ProductView', { product: item })} />)
  }

  _renderHeader = () => {
    return (
      <View style={styles.listHeaderView} >
        <OutlineOption style={{width: w / 2.5}} title="Фильтры" onPress={() => this.setState({filterShow: true})} />
        <OutlineOption style={{width: w / 2.5}} title="Сортировка" />
      </View>
    )
  }

  _renderFooter= () => {
    const { current_page, last_page } = this.props
    return (<ItemFooter current_page={current_page} last_page={last_page} onPagePress={(page) => console.log(page)} />)
  }

  _renderFlat = () => {
    const { items, isLoadingItems } = this.props

    if (isLoadingItems === true) {
      return (<Loader animating={!isLoadingItems} />)
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
    const { navigation, categories } = this.props
    const { filterShow, productAddShow } = this.state
    return (
      <View style={styles.container}>
        <CustomStatusBar backgroundColor="#fff" barStyle="dark-content" />        
        <Header onPress={() => navigation.openDrawer()} />
        <ProductAdded visibility={productAddShow} hide={() => this.setState({productAddShow: false})} />
        <FilterModal visibility={filterShow} hide={() => this.setState({filterShow: false})} />
        <CategorySlider data={categories} navigation={navigation} />
        <ScrollView style={styles.scrollView}>          
          <View style={styles.bodyView}>            
            <Text style={styles.headerText}>Бакалея</Text>
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
    marginVertical: 10,
    paddingHorizontal: 25
  },
  headerText: {
    fontFamily: 'CenturyGothic',
    fontSize: 35,
    textAlign: 'center'
  },
  container: {
    justifyContent: 'flex-start',
    flex: 1    
  },
  scrollView: {
    flex: 1,
    backgroundColor: '#F9F9F9'
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
export default connect(mapStateToProps, { getBrands, getProducts, addToCard, getCard })(Catalog)
