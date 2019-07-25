import axios from 'axios'
import {
  ACTION_ORDERS_GET_STARTED,
  ACTION_ORDERS_GET_SUCCESS,
  ACTION_ORDERS_GET_FAILED
} from '../types'
import { hostName } from '../../../constants/global'
import { transformOrder } from '../../../transform'
  
export const getMyOrders = () => async (dispatch, getState) => {
  try {
    dispatch({
      type: ACTION_ORDERS_GET_STARTED
    })
    const { token } = getState().auth
    console.log(`${hostName}/api/v1/user/orders?api_token=${token}`)
    const { data } = await axios.get(`${hostName}/api/v1/user/orders?api_token=${token}`)
    console.log(data)
    const items = data.map((item) => transformOrder(item))
    dispatch({
      type: ACTION_ORDERS_GET_SUCCESS,
      payload: items
    })
  } catch (error) {
    dispatch({
      type: ACTION_ORDERS_GET_FAILED,
      error
    })
  }
}

