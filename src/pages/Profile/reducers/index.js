import {
  ACTION_PROFILE_GET_SUCCESS,
  ACTION_PROFILE_GET_FAILED
} from '../types'
  
const initialState = {
  
}
    
export default (state = initialState, action) => {
  switch (action.type) {
  case ACTION_PROFILE_GET_SUCCESS: {
    return {
      ...state
    }    
  }
  case ACTION_PROFILE_GET_FAILED: {
    return {
      ...state
    } 
  }
  default: {
    return state
  }
  }
}

