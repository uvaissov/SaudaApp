import axios from 'axios'
import { hostName } from '../../../constants/global'
import { transformBrand, transformProduct } from '../../../transform'
import {
  ACTION_GET_BRANDS_SUCCESED,
  ACTION_GET_BRANDS_FAILED,
  ACTION_GET_ITEMS_STARTED,
  ACTION_GET_ITEMS_SUCCESED,
  ACTION_GET_ITEMS_FAILED
} from '../types'

export const getProducts = (categoryId) => async dispatch => {
  try {
    dispatch({
      type: ACTION_GET_ITEMS_STARTED
    })
    const response = await axios.get(`${hostName}/api/v1/products/${categoryId}?city=1`)
    const { current_page, data, last_page} = response.data
    const items = data.map((row) => transformProduct(row))
    dispatch({
      type: ACTION_GET_ITEMS_SUCCESED,
      payload: items,
      current_page,
      last_page
    })
  } catch (error) {
    dispatch({
      type: ACTION_GET_ITEMS_FAILED,
      error
    })
  }
}

export const getBrands = () => async dispatch => {
  try {
    const response = await axios.get(`${hostName}/api/v1/brands`)
    const data = response.data.map((row) => transformBrand(row))
    dispatch({
      type: ACTION_GET_BRANDS_SUCCESED,
      payload: data
    })
  } catch (error) {
    dispatch({
      type: ACTION_GET_BRANDS_FAILED,
      error
    })
  }
}
