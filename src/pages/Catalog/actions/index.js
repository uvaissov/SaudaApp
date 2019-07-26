import axios from 'axios'
import _ from 'lodash'
import { hostName } from '../../../constants/global'
import { transformBrand, transformProduct } from '../../../transform'
import {
  ACTION_GET_BRANDS_SUCCESED,
  ACTION_GET_BRANDS_FAILED,
  ACTION_GET_ITEMS_STARTED,
  ACTION_GET_ITEMS_SUCCESED,
  ACTION_GET_ITEMS_FAILED,
  ACTION_ADD_BRAND_FILTER,
  ACTION_DEL_BRAND_FILTER,
  ACTION_CLEAN_FILTERS
} from '../types'

export const getProducts = (categoryId, page) => async (dispatch, getState) => {
  try {
    dispatch({
      type: ACTION_GET_ITEMS_STARTED
    })
    const { city } = getState().auth
    const { filterBrands, filterPriceMin, filterPriceMax } = getState().catalog 
    let filterBrand = ''
    _.forEach(filterBrands, ({id}) => {
      filterBrand += `&brands[]=${id}`
    }) 
    const response = await axios.get(`${hostName}/api/v1/products/${categoryId}?city=${city}&page=${page}${filterBrand}`)
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

export const addBrandFilter = (value) => {
  return {
    type: ACTION_ADD_BRAND_FILTER,
    payload: value
  }
}

export const delBrandFilter = (value) => {
  return {
    type: ACTION_DEL_BRAND_FILTER,
    payload: value
  }
}

export const cleanFilters = () => {
  return {
    type: ACTION_CLEAN_FILTERS
  }
}
