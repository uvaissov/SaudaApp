import {
  ACTION_ORDERS_GET_SUCCESS,
  ACTION_ORDERS_GET_FAILED
} from '../types'
  
const initialState = {
  items: []
}
    
export default (state = initialState, action) => {
  switch (action.type) {
  case ACTION_ORDERS_GET_SUCCESS: {
    return {
      ...state,
      items: action.payload
    }    
  }
  case ACTION_ORDERS_GET_FAILED: {
    return {
      ...state
    } 
  }
  default: {
    return state
  }
  }
}

