import { 
  ACTION_GET_BRANDS_SUCCESED,
  ACTION_GET_ITEMS_STARTED,
  ACTION_GET_ITEMS_SUCCESED,
  ACTION_GET_ITEMS_FAILED
} from '../types'

const initialState = {
  isLoadingItems: false,
  current_page: 1,
  last_page: 1,
  items: [],
  brands: []
}
  
export default (state = initialState, action) => {
  switch (action.type) {
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
      isLoadingItems: true
    }
  }
  case ACTION_GET_ITEMS_FAILED: {
    return {
      ...state,
      isLoadingItems: false
    }
  }
  default: {
    return state
  }
  }
}
