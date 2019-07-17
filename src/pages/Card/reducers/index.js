import { 
  ACTION_GET_FAVORITE_ITEMS_STARTED,
  ACTION_GET_FAVORITE_ITEMS_FAILED,
  ACTION_GET_FAVORITE_ITEMS_SUCCESED
} from '../types'
  
const initialState = {
  isLoadingItems: false,
  items: []
}
    
export default (state = initialState, action) => {
  switch (action.type) {
  case ACTION_GET_FAVORITE_ITEMS_SUCCESED: {
    return {
      ...state,
      items: action.payload,
      isLoadingItems: false
    }
  }
  case ACTION_GET_FAVORITE_ITEMS_STARTED: {
    return {
      ...state,
      isLoadingItems: true
    }
  }
  case ACTION_GET_FAVORITE_ITEMS_FAILED: {
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

