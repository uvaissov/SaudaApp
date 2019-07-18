import axios from 'axios'
import _ from 'lodash'
import { hostName } from '../../../constants/global'
import { transformProduct } from '../../../transform'
import {
  ACTION_GET_CARD_ITEMS_STARTED,
  ACTION_GET_CARD_ITEMS_SUCCESED,
  ACTION_GET_CARD_ITEMS_FAILED,
  ACTION_ADD_CARD_ITEMS_SUCCESED,
  ACTION_ADD_CARD_ITEMS_FAILED
} from '../types'

export const getCard = () => async (dispatch, getState) => {
  try {
    dispatch({
      type: ACTION_GET_CARD_ITEMS_STARTED
    })
    const { auth } = getState()
    const { cardUuid } = auth
    const { data } = await axios.get(`${hostName}/api/v1/cart?uid=${cardUuid}`)
    const { cart, count, total_price } = data
    const items = _.values(cart).map((row) => transformProduct(row))    
    dispatch({
      type: ACTION_GET_CARD_ITEMS_SUCCESED,
      payload: items,
      count,
      total_price
    })
    return count
  } catch (error) {
    dispatch({
      type: ACTION_GET_CARD_ITEMS_FAILED,
      error
    })
  }
}
export const addToCard = (propuctId, quantity) => async (dispatch, getState) => {
  try {
    const { auth } = getState()
    const { cardUuid } = auth
    const { data } = await axios.post(`${hostName}/api/v1/cart/add?uid=${cardUuid}&id=${propuctId}&q=${quantity}`)
    const { count, total_price } = data
    dispatch({
      type: ACTION_ADD_CARD_ITEMS_SUCCESED,
      count,
      total_price
    })    
    return count
  } catch (error) {
    dispatch({
      type: ACTION_ADD_CARD_ITEMS_FAILED,
      error
    })
  }
}

export const removeFromCard = (propuctId) => async (dispatch, getState) => {
  try {
    const { auth } = getState()
    const { cardUuid } = auth
    const { data } = await axios.post(`${hostName}/api/v1/cart/remove?uid=${cardUuid}&id=${propuctId}`)
    const { count, total_price } = data
    dispatch({
      type: ACTION_ADD_CARD_ITEMS_SUCCESED,
      count,
      total_price
    })    
    return count
  } catch (error) {
    dispatch({
      type: ACTION_ADD_CARD_ITEMS_FAILED,
      error
    })
  }
}

