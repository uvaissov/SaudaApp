import { ACTION_SELECT_USER_CITY, ACTION_SELECT_USER_CARD_UUID, ACTION_SET_TOKEN } from '../types'
  
const initialState = {
  cardUuid: null,
  token: null,
  city: null
}
    
export default (state = initialState, action) => {
  switch (action.type) {
  case ACTION_SELECT_USER_CITY: {
    return {
      ...state,
      city: action.payload
    }
  }
  case ACTION_SELECT_USER_CARD_UUID: {
    return {
      ...state,
      cardUuid: action.payload
    }
  }
  case ACTION_SET_TOKEN: {
    return {
      ...state,
      token: action.payload
    }
  }
  default: {
    return state
  }
  }
}
 
