import { 
  ACTION_GET_CARD_ITEMS_STARTED,
  ACTION_GET_CARD_ITEMS_SUCCESED,
  ACTION_GET_CARD_ITEMS_FAILED,
  ACTION_ADD_CARD_ITEMS_SUCCESED
} from '../types'
  
const initialState = {
  isLoadingItems: false,
  items: [],
  count: 0,
  total_price: 0
}
    
export default (state = initialState, action) => {
  switch (action.type) {
  case ACTION_GET_CARD_ITEMS_SUCCESED: {
    return {
      ...state,
      items: action.payload,
      count: action.count,
      total_price: action.total_price,
      isLoadingItems: false
    }
  }
  case ACTION_ADD_CARD_ITEMS_SUCCESED: {
    return {
      ...state,
      count: action.count,
      total_price: action.total_price
    }
  }
  case ACTION_GET_CARD_ITEMS_STARTED: {
    return {
      ...state,
      isLoadingItems: true
    }
  }
  case ACTION_GET_CARD_ITEMS_FAILED: {
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

