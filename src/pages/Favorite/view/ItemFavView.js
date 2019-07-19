import React, {Component} from 'react'
import { StyleSheet, Text, View, TouchableOpacity} from 'react-native'
import FontAwesome from 'react-native-vector-icons/FontAwesome'
import { connect } from 'react-redux'
import FastImage from 'react-native-fast-image'
import { remFromFav } from '../../Favorite/actions'
import { Button } from '../../Catalog/view/Button'
import { w, normalize, BLACK } from '../../../constants/global'

class ItemFavView extends Component {
  remFavorite = (item) => {
    this.props.remFromFav(item)
  }

  render() {
    const { item, onCardPress } = this.props
    return (
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
              <TouchableOpacity onPress={() => this.remFavorite(item)}>
                <View><FontAwesome name="trash-o" size={25} color={BLACK} /></View>
              </TouchableOpacity>
            </View>
            <View><Text style={styles.itemPriceText}>340 тг</Text></View>
            <View><Button title="В корзину" icon="cart" onPress={() => onCardPress(item.id, 1)} /></View>
          </View>
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({ 
  priceView: {
    paddingLeft: 15
  },
  itemTitle: {    
    fontFamily: 'CenturyGothic',
    fontSize: normalize(11),
    color: 'black'
  },
  itemPriceText: {
    fontFamily: 'CenturyGothic',
    fontSize: normalize(13),
    color: '#FF798D'  
  },
  container: {
    width: w - 50,
    marginHorizontal: 25,
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
export default connect(mapStateToProps, { remFromFav })(ItemFavView)
