import React, { Component } from 'react'
import { Text, StyleSheet, View, TextInput, ScrollView, FlatList, TouchableOpacity } from 'react-native'
import _ from 'lodash'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import Modal from 'react-native-modal'
import { connect } from 'react-redux'
import Ionicons from 'react-native-vector-icons/Ionicons'
import EvilIcons from 'react-native-vector-icons/EvilIcons'
import { changePriceMIn, changePriceMax} from '../../actions'
import { w, h, WHITE } from '../../../../constants/global'
import { OutlineOption } from '../OutlineOption'
import ScrollElement from './ScrollElement'

class FilterModal extends Component {
    state = {
      topScroll: 0,
      height: w * 0.6,
      textInputFilter: ''
    }

    _scroll = (event) => {
      const { y } = event.nativeEvent.contentOffset
      const { height } = this.state
      this.setState({ topScroll: ((height) * (y / (event.nativeEvent.contentSize.height))) })
    }

    _indicatorHeight = () => {
      const { height } = this.state
      const count = this.props.brands.length
      const indicatorHeight = ((height * 6.94) / count)      
      return height > indicatorHeight ? indicatorHeight : 0
    }

    _renderItem =({item}) => {
      return (<ScrollElement item={item} />)
    }

    _filterData = (brands) => {
      const { textInputFilter: text } = this.state
      if (!_.isEmpty(text)) {
        return _.filter(brands, (el) => _.includes(_.toLower(el.name), _.toLower(text)))
      }
      return brands
    }

    _onChangePriceMin = (value) => {
      this.props.changePriceMIn(value)
    }

    _onChangePriceMax = (value) => {
      this.props.changePriceMax(value)
    }

    render() {
      const { visibility, hide, brands, filterPriceMin, filterPriceMax } = this.props
      const { topScroll, height } = this.state
      return (
        <Modal                   
          deviceWidth={w}
          deviceHeight={h}
          isVisible={visibility} 
          onRequestClose={() => hide()} 
          onBackdropPress={() => hide()} 
          backdropOpacity={0.2}
          backdropColor="#000"
          useNativeDriver
        >
          
          <View style={styles.view}>
            <TouchableOpacity style={styles.closeBtnView} onPress={() => hide()} >
              <View style={styles.closeBtn}>
                <EvilIcons name="close" size={30} />
              </View>
            </TouchableOpacity>        
            <View style={styles.content}>
              <View>
                <Text style={styles.brendWord}>Бренд</Text>
              </View>              
              <View style={styles.textView}>
                <TextInput style={[styles.textInput]} onChangeText={(text) => this.setState({textInputFilter: text})} placeholder="Найдите бренд" value={this.state.textInputFilter} />
                <Ionicons name="ios-search" size={21} />
              </View>
              <KeyboardAwareScrollView keyboardVerticalOffset={50} behavior="padding" enabled>
                <View style={{flexDirection: 'row', height, marginBottom: 10}} >
                  <ScrollView 
                    style={{flex: 1 }}
                    onScroll={this._scroll}
                    showsVerticalScrollIndicator={false}
                  >
                    <FlatList 
                      data={this._filterData(brands)}
                      renderItem={this._renderItem}
                    />
                  </ScrollView>
                  <View style={{backgroundColor: this._indicatorHeight() === 0 ? 'white' : 'rgba(0,0,0,0.2)', position: 'relative'}}>
                    <View style={{width: 5, height: this._indicatorHeight(), backgroundColor: '#6ACB6D', position: 'relative', top: topScroll}} />
                  </View>
                </View>              
              
                <View style={styles.separator} />
                <View style={{ alignItems: 'center'}}>
                  <OutlineOption title="Цена" style={{width: w / 1.5, borderWidth: 0 }} />                
                  <View style={styles.filterRow}>
                    <Text style={styles.brendWord}>От</Text>
                    <View style={[styles.textView, styles.filterTextView]} >
                      <TextInput style={[styles.textInput, styles.filterTextInput]} value={filterPriceMin} keyboardType={'numeric'} onChangeText={(text) => this._onChangePriceMin(text)} />
                    </View>
                    <Text style={styles.brendWord}>KZT</Text>
                  </View>
                  <View style={styles.filterRow}>
                    <Text style={styles.brendWord}>До</Text>
                    <View style={[styles.textView, styles.filterTextView]} >
                      <TextInput style={[styles.textInput, styles.filterTextInput]} value={filterPriceMax} keyboardType={'numeric'} onChangeText={(text) => this._onChangePriceMax(text)} />
                    </View>
                    <Text style={styles.brendWord}>KZT</Text>
                  </View>                  
                </View>
              </KeyboardAwareScrollView>
            </View>
           
          </View>          
        </Modal>
      )
    }
}

const styles = StyleSheet.create({
  filterRow: {
    flexDirection: 'row',
    alignItems: 'center'    
  },
  filterTextView: {
    width: 150,
    marginHorizontal: 15,
    marginVertical: 2
  },
  filterTextInput: {
    textAlign: 'center'
  },
  separator: {
    borderBottomColor: 'rgba(0, 0, 0, 0.3)',
    borderBottomWidth: 2
  },
  content: {
    backgroundColor: 'white',
    height: h * 0.75,
    width: w - 50,
    borderWidth: 1,
    borderColor: '#6ACB6D',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    padding: 25
  },
  view: {
    //width: w,
    height: h,
    //flex: 1,
    marginBottom: 0,
    justifyContent: 'flex-end',
    alignItems: 'center'
  },
  brendWord: {
    fontSize: 15,
    fontFamily: 'CenturyGothic',
    color: 'rgba(0, 0, 0, 0.6)'
  },
  textView: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 15,
    backgroundColor: 'rgba(0, 0, 0, 0.05)',
    paddingHorizontal: 20,
    marginVertical: 10
  },
  textInput: {
    flex: 1,
    fontFamily: 'CenturyGothic',
    paddingVertical: 0,
    fontSize: 14,
    height: 30,
    color: 'rgba(0, 0, 0, 1)'
  },
  closeBtnView: {
    top: -25
  },
  closeBtn: {
    backgroundColor: WHITE,
    borderRadius: 100,    
    borderWidth: 0,
    alignItems: 'center',
    justifyContent: 'center',
    width: 50,
    height: 50
  }
})

const mapStateToProps = state => {
  return {      
    brands: state.catalog.brands,
    filterBrands: state.catalog.filterBrands,
    filterPriceMin: state.catalog.filterPriceMin,
    filterPriceMax: state.catalog.filterPriceMax
  }
}
export default connect(mapStateToProps, { changePriceMIn, changePriceMax })(FilterModal)
  
