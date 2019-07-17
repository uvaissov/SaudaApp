import axios from 'axios'
import { hostName } from '../../../constants/global'
import { transformProduct } from '../../../transform'
import {
  ACTION_GET_CARD_ITEMS_STARTED,
  ACTION_GET_CARD_ITEMS_SUCCESED,
  ACTION_GET_CARD_ITEMS_FAILED
} from '../types'

export const getCard = () => async (dispatch, getState) => {
  try {
    dispatch({
      type: ACTION_GET_CARD_ITEMS_STARTED
    })
    const { auth } = getState()
    const { cardUuid } = auth
    console.log(`${hostName}api/v1/cart?uid=${cardUuid}`)
    const { data, count, total_price } = await axios.get(`${hostName}/api/v1/cart?uid=${cardUuid}`)
    const items = data.cart.map((row) => transformProduct(row))
    dispatch({
      type: ACTION_GET_CARD_ITEMS_SUCCESED,
      payload: items,
      count,
      total_price
    })
  } catch (error) {
    dispatch({
      type: ACTION_GET_CARD_ITEMS_FAILED,
      error
    })
  }
}
