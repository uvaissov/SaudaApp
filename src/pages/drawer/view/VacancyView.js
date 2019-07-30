import React, {Component} from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { w, FONT, GREEN } from '../../../constants/global'

class VacancyView extends Component {
  state = {
    showTotal: false
  }
  
  render() {
    const { item } = this.props
    //title, payment_type, salary, employment_type
    return (
      <View style={[styles.container, styles.shadow]}>
        <Text style={[styles.word, {marginBottom: 5}]}>{item.title}</Text>
        <Text style={[styles.word, {marginBottom: 10, color: GREEN}]}>{item.salary} тг / <Text style={[styles.word]}>{item.payment_type}</Text></Text>
        <Text style={[styles.word]}>{item.employment_type} </Text>
      </View>
    )
  }
}

const styles = StyleSheet.create({ 
  container: {
    width: w - 50,
    backgroundColor: 'white',
    padding: 20,
    marginBottom: 20,
    marginHorizontal: 5,
    borderWidth: 0
  },
  word: {
    fontFamily: FONT
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

export default VacancyView 
