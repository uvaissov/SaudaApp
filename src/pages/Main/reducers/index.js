
const initialState = {
  isLoading: false
}
  
export default (state = initialState, action) => {
  switch (action.type) {
  case 'ACTION_GET_NEWS_STARTED': {
    return {
      ...state,
      isLoading: true
    }
  }
  default: {
    return state
  }
  }
}
