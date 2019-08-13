import _ from 'lodash'
import {
  ACTION_ADD_FAV_ITEM,
  ACTION_REM_FAV_ITEM,
  ACTION_CLEAR_ALL_FAV_ITEMS
} from '../types'
  
const initialState = {
  items: []
}
    
export default (state = initialState, action) => {
  switch (action.type) {
  case ACTION_ADD_FAV_ITEM: {
    const { id } = action.payload
    const index = _.findIndex(state.items, (current) => current.id === id)
    if (index < 0) {
      return {
        ...state,
        items: [...state.items, action.payload]
      }
    } 

    return {
      ...state,
      items: [
        ...state.items.slice(0, index), 
        action.payload, 
        ...state.items.slice(index + 1, state.items.length)]
    }    
  }
  case ACTION_REM_FAV_ITEM: {
    return {
      ...state,
      items: _.reject(state.items, (current) => current.id === action.payload.id)
    }
  }
  case ACTION_CLEAR_ALL_FAV_ITEMS: {
    return {
      ...state,
      items: []
    }
  }
  default: {
    return state
  }
  }
}

