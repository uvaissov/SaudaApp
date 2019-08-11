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
  ACTION_CLEAN_FILTERS,
  ACTION_CHANGE_PRICE_MIN_FILTER,
  ACTION_CHANGE_PRICE_MAX_FILTER,
  ACTION_SET_SORTED,
  ACTION_SET_SEARCH_TEXT,
  ACTION_GET_SEARCH_ITEMS_SUCCESED,
  ACTION_GET_SEARCH_ITEMS_STARTED,
  ACTION_GET_SEARCH_ITEMS_FAILED
} from '../types'

/** {id: 'date_sort', name: 'По новинкам'}, 
    {id: 'popularity_sort', name: 'По популярности'}, 
    {id: 'price_sort_asc', name: 'По возрастанию цены'}, 
    {id: 'price_sort_desc', name: 'По убыванию цены'}
 */
export const getProducts = (categoryId, page) => async (dispatch, getState) => {
  try {
    dispatch({
      type: ACTION_GET_ITEMS_STARTED
    })
    const { city } = getState().auth
    const { filterBrands, filterPriceMin, filterPriceMax, sorted } = getState().catalog 
    let filterBrand = ''
    _.forEach(filterBrands, ({id}) => {
      filterBrand += `&brands[]=${id}`
    })
    let filterPrice = ''
    if (!_.isEmpty(filterPriceMin)) {
      filterPrice = `&price=${filterPriceMin}_`
    }
    if (!_.isEmpty(filterPriceMax)) {
      filterPrice += _.includes(filterPrice, '_') ? filterPriceMax : `&price=_${filterPriceMax}`
    }
    let sortLine = ''
    if (!_.isEmpty(sorted)) {
      switch (sorted) {
      case 'date_sort':
        sortLine += '&date_sort=desc'
        break
      case 'popularity_sort':
        sortLine += '&popularity_sort=asc'
        break
      case 'price_sort_asc':
        sortLine += '&price_sort=asc'
        break
      case 'price_sort_desc':
        sortLine += '&price_sort=desc'
        break
                  
      default:
        break
      }     
    }
    const url = `${hostName}/api/v1/products/${categoryId}?city_id=${city}&per_page=8&page=${page}${filterBrand}${filterPrice}${sortLine}`
    console.log(url)
    const response = await axios.get(url)
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

export const searchQuery = (page) => async (dispatch, getState) => {
  try {
    dispatch({
      type: ACTION_GET_SEARCH_ITEMS_STARTED
    })
    const { city } = getState().auth
    const { search } = getState().catalog     
    const response = await axios.get(`${hostName}/api/v1/search/${search}?city=${city}&per_page=8&page=${page}`)
    const { current_page, data, last_page} = response.data
    const items = data.map((row) => transformProduct(row))
    dispatch({
      type: ACTION_GET_SEARCH_ITEMS_SUCCESED,
      payload: items,
      current_page,
      last_page
    })
  } catch (error) {
    dispatch({
      type: ACTION_GET_SEARCH_ITEMS_FAILED,
      error
    })
  }
}

export const changePriceMIn = (value) => {
  return {
    type: ACTION_CHANGE_PRICE_MIN_FILTER,
    payload: value
  }
}

export const changePriceMax = (value) => {
  return {
    type: ACTION_CHANGE_PRICE_MAX_FILTER,
    payload: value
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

export const setSorted = (value) => {
  return {
    type: ACTION_SET_SORTED,
    payload: value
  }
}

export const changeText = (value) => {
  return {
    type: ACTION_SET_SEARCH_TEXT,
    payload: value
  }
}

export const cleanFilters = () => {
  return {
    type: ACTION_CLEAN_FILTERS
  }
}
