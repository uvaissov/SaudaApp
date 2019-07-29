import React, {Component} from 'react'
import _ from 'lodash'
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native'
import Ionicons from 'react-native-vector-icons/Ionicons'
import { connect } from 'react-redux'
import FastImage from 'react-native-fast-image'
import { toFav, remFromFav } from '../../Favorite/actions'
import { w } from '../../../constants/global'
import { Button } from './Button'

class ItemRowView extends Component {
  toFavorite = (item) => {
    this.props.toFav(item)
  }
  remFavorite = (item) => {
    this.props.remFromFav(item)
  }

  renderFavButton =() => {
    const { item, items } = this.props    
    const isExistFromFav = _.findIndex(items, (current) => current.id === item.id)
    if (isExistFromFav > -1) {
      return (<TouchableOpacity onPress={() => this.remFavorite(item)}><View><Ionicons name="md-heart" size={25} color="#FF798D" /></View></TouchableOpacity>)
    }
    return (<TouchableOpacity onPress={() => this.toFavorite(item)}><View><Ionicons name="md-heart-empty" size={25} color="#FF798D" /></View></TouchableOpacity>)
  }

  render() {
    const { item, onPress, onCardPress } = this.props    
    return (
      <TouchableOpacity onPress={onPress}>
        <View style={[styles.container, styles.shadow]}>
          <View style={styles.rowContainer}>
            <View style={styles.imgView}>
              <FastImage
                style={{ height: 90, width: 70 }} 
                source={item.img}
                resizeMode={FastImage.resizeMode.contain}
              />
            </View>
            <View style={styles.bodyView}>
              <View style={{flexDirection: 'row'}}>
                <View style={{flex: 1}}><Text style={styles.itemTitle} >{item.title}</Text></View>
                {this.renderFavButton()}
              </View>
              <View><Text style={styles.itemPriceText}>{item.price} тг</Text></View>
              <View><Button title="В корзину" icon="cart" onPress={() => onCardPress(item.id, 1)} /></View>
            </View>
          </View>
        </View>
      </TouchableOpacity>
    )
  }
}

const styles = StyleSheet.create({ 
  itemTitle: {    
    fontFamily: 'CenturyGothic',
    fontSize: 14,
    color: 'black'
  },
  itemPriceText: {
    fontFamily: 'CenturyGothic',
    fontSize: 14,
    color: '#FF798D',
    marginVertical: 2
  },
  container: {
    width: w - 50,
    //marginHorizontal: 25,
    backgroundColor: 'white',
    padding: 20,
    marginBottom: 20,
    borderWidth: 0
  },
  rowContainer: {
    flex: 1,
    flexDirection: 'row'
  },
  imgView: {
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 20
  },
  bodyView: {
    flex: 1,
    justifyContent: 'space-between'
  },
  shadow: {
    shadowColor: 'rgba(0, 0, 0, 1)',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 8,
    position: 'relative'
  }
})

const mapStateToProps = state => {
  return {
    items: state.favorite.items
  }
}
export default connect(mapStateToProps, { toFav, remFromFav })(ItemRowView)
