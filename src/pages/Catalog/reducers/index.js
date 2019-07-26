import _ from 'lodash'

import { 
  ACTION_GET_BRANDS_SUCCESED,
  ACTION_GET_ITEMS_STARTED,
  ACTION_GET_ITEMS_SUCCESED,
  ACTION_GET_ITEMS_FAILED,
  ACTION_ADD_BRAND_FILTER,
  ACTION_DEL_BRAND_FILTER,
  ACTION_CLEAN_FILTERS
} from '../types'

const initialState = {
  isLoadingItems: false,
  current_page: 1,
  last_page: 1,
  items: [],
  brands: [],
  filterBrands: [],
  filterPriceMin: null,
  filterPriceMax: null
}
  
export default (state = initialState, action) => {
  switch (action.type) {
  case ACTION_CLEAN_FILTERS: {
    return {
      ...state,
      filterBrands: [],
      filterPriceMin: null,
      filterPriceMax: null
    }
  }
  case ACTION_GET_BRANDS_SUCCESED: {
    return {
      ...state,
      brands: action.payload
    }
  }
  case ACTION_GET_ITEMS_SUCCESED: {
    return {
      ...state,
      items: action.payload,
      current_page: action.current_page,
      last_page: action.last_page,
      isLoadingItems: false
    }
  }
  case ACTION_GET_ITEMS_STARTED: {
    return {
      ...state,
      isLoadingItems: true,
      items: []
    }
  }
  case ACTION_GET_ITEMS_FAILED: {
    return {
      ...state,
      isLoadingItems: false
    }
  }
  case ACTION_ADD_BRAND_FILTER: {
    const { id } = action.payload
    const index = _.findIndex(state.filterBrands, (current) => current.id === id)
    if (index < 0) {
      return {
        ...state,
        filterBrands: [...state.filterBrands, action.payload]
      }
    } 

    return {
      ...state,
      filterBrands: [
        ...state.filterBrands.slice(0, index), 
        action.payload, 
        ...state.filterBrands.slice(index + 1, state.filterBrands.length)]
    }    
  }
  case ACTION_DEL_BRAND_FILTER: {
    return {
      ...state,
      filterBrands: _.reject(state.filterBrands, (current) => current.id === action.payload.id)
    }
  }
  default: {
    return state
  }
  }
}
