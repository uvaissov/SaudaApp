import React, {Component} from 'react'
import { StyleSheet, View, TouchableOpacity, TextInput } from 'react-native'
import { connect } from 'react-redux'
import _ from 'lodash'
import FastImage from 'react-native-fast-image'
import { changeText, searchQuery } from '../../pages/Catalog/actions'
import Location from '../modals/Location'
import { normalize } from '../../constants/global'

class Header extends Component {
  state={
    locationShow: false,
    text: ''
  }

  changeText = (text) => {
    this.props.changeText(text)
  }

  search = () => {
    const { search, navigation } = this.props
    if (!_.isEmpty(search)) {
      navigation.navigate('Search')
      this.props.searchQuery()
    }
  }  

  render() {
    const { onPress, search } = this.props
    const { locationShow } = this.state
    return (
      <View style={[styles.container, styles.shadow]}>
        <Location visibility={locationShow} hide={() => this.setState({locationShow: false})} />           
        <View style={styles.headerView}>
          <TouchableOpacity onPress={onPress}>          
            <FastImage
              style={styles.image}
              source={require('../../../resources/images/icons/header/menu.png')}
              resizeMode={FastImage.resizeMode.contain}
            />
          </TouchableOpacity>
          <View style={styles.textView}>
            <TextInput onSubmitEditing={() => this.search()} returnKeyType="search" value={search} onChangeText={this.changeText} style={[styles.textInput]} placeholder="Введите название продукта" />
            <TouchableOpacity onPress={() => this.search()}>
              <FastImage
                style={{height: 15, width: 15}}
                source={require('../../../resources/images/icons/header/search.png')}
                resizeMode={FastImage.resizeMode.contain}
              />
            </TouchableOpacity>
          </View>
          <TouchableOpacity onPress={() => this.setState({locationShow: true})}>
            <FastImage
              style={styles.image}
              source={require('../../../resources/images/icons/header/location.png')}
              resizeMode={FastImage.resizeMode.contain}
            />
          </TouchableOpacity>
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  image: {
    height: 30,
    width: 30
  },
  container: {
    height: 60,
    justifyContent: 'flex-end',
    backgroundColor: '#fff',
    paddingHorizontal: 20
  },
  shadow: {
    shadowColor: 'rgba(0, 0, 0, 0.1)',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 16,
    elevation: 8,
    position: 'relative'

  },
  headerView: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    marginBottom: 10
  },
  textView: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 15,
    borderWidth: 1,
    borderColor: '#67cf70',
    marginHorizontal: 20,
    paddingHorizontal: 10
  },
  textInput: {
    flex: 1,
    fontFamily: 'CenturyGothic',
    paddingVertical: 0,
    fontSize: normalize(9),
    height: 30    
  }
})

const mapStateToProps = state => {
  return {
    search: state.catalog.search
  }
}

export default connect(mapStateToProps, { changeText, searchQuery })(Header)
