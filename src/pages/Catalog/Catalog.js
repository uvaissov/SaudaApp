import React, {Component} from 'react'
import { StyleSheet, Text, View, ScrollView, FlatList} from 'react-native'
import { connect } from 'react-redux'
import Header from '../../components/main/Header'
import Footer from '../../components/main/Footer'
import CustomStatusBar from '../../components/CustomStatusBar'
import CategorySlider from '../Main/view/CategorySlider'
import ItemView from './view/ItemView'
import { OutlineOption } from './view/OutlineOption'
import FilterModal from './view/modal/FilterModal'
import { w } from '../../constants/global'

class Catalog extends Component {
  state={
    loginShow: false,
    filterShow: false
  }

  _renderItem =({ item }) => {
    return (<ItemView item={item} />)
  }

  _renderHeader = () => {
    return (
      <View style={styles.listHeaderView} >
        <OutlineOption style={{width: w / 2.5}} title="Фильтры" onPress={() => this.setState({filterShow: true})} />
        <OutlineOption style={{width: w / 2.5}} title="Сортировка" />
      </View>
    )
  }
  
  render() {
    const { navigation, categories, items } = this.props
    const { filterShow } = this.state
    return (
      <View style={styles.container}>
        <CustomStatusBar backgroundColor="#fff" barStyle="dark-content" />
        <Header onPress={() => navigation.openDrawer()} />
        <FilterModal visibility={filterShow} hide={() => this.setState({filterShow: false})} />
        <CategorySlider data={categories} navigation={navigation} />
        <ScrollView style={styles.scrollView}>          
          <View style={styles.bodyView}>            
            <Text style={styles.headerText}>Бакалея</Text>
          </View>
          <FlatList 
            data={items}
            renderItem={this._renderItem}
            ListHeaderComponent={this._renderHeader}
            keyExtractor={(item) => item.id}
          />
        </ScrollView>        
        <Footer />
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
  console.log(state)
  return {
    categories: state.main.categories,
    items: state.catalog.items
  }
}
export default connect(mapStateToProps, { })(Catalog)
