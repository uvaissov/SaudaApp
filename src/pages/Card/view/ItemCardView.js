import React, {Component} from 'react'
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native'
import FontAwesome from 'react-native-vector-icons/FontAwesome'
import FastImage from 'react-native-fast-image'
import { w, normalize } from '../../../constants/global'
import { CountCardControl } from './CountCardControl'

class ItemCardView extends Component {
  constructor(props) {
    super(props)
    this.state = { count: this.props.item.amount }
  }

  changeCount = (q) => {
    if (q < 0 && this.state.count < 2) {
      return
    }
    const total = this.state.count + q
    this.setState({count: total })
    this.props.addToCard(this.props.item.id, total)
  }
  render() {
    const { item, removeFromCard } = this.props
    return (
      <View style={[styles.container, styles.shadow]}>
        <View style={styles.rowContainer}>
          <View style={styles.imgView}>
            <FastImage
              style={{ height: 110, width: 70 }} 
              source={item.img}
              resizeMode={FastImage.resizeMode.cover}
            />
          </View>
          <View style={styles.bodyView}>
            <View style={{flexDirection: 'row'}}>
              <View style={{flex: 1}}><Text style={styles.itemTitle} >{item.title}</Text></View>
              <TouchableOpacity onPress={() => removeFromCard(item.id)} style={{position: 'relative', top: -10, right: -10}}>
                <View ><FontAwesome name="trash-o" size={25} color="rgba(0,0,0,0.5)" /></View>
              </TouchableOpacity>
            </View>
              
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
              <CountCardControl               
                onPressLeft={() => this.changeCount(-1)} 
                onPressRight={() => this.changeCount(1)} 
                count={this.state.count} 
              />
              <View style={styles.priceView}><Text style={styles.itemPriceText}>340 тг</Text></View>
            </View>
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
export default ItemCardView
