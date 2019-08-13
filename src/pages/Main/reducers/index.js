import { 
  ACTION_GET_CATEGORIOS_SUCCESED,
  ACTION_GET_CATEGORIOS_STARTED,
  ACTION_GET_CATEGORIOS_FAILED,
  ACTION_GET_CITY_SUCCESED,
  ACTION_GET_SLIDER_SUCCESED,
  ACTION_GET_SLIDER_FAILED
} from '../types'

const initialState = {
  isLoading: false,
  categories: [],
  cities: [],
  sliders: [],
  brandSliders: [
    { img: require('../../../../resources/images/img/brands/1.png'), img1: require('../../../../resources/images/img/brands/2.png')},
    { img: require('../../../../resources/images/img/brands/5.png'), img1: require('../../../../resources/images/img/brands/4.png')},
    { img: require('../../../../resources/images/img/brands/3.png')}
  ]
}
  
export default (state = initialState, action) => {
  switch (action.type) {
  case ACTION_GET_CATEGORIOS_SUCCESED: {
    return {
      ...state,
      categories: action.payload,
      isLoading: false
    }
  }
  case ACTION_GET_CATEGORIOS_STARTED: {
    return {
      ...state,
      isLoading: true
    }
  }
  case ACTION_GET_CATEGORIOS_FAILED: {
    return {
      ...state,
      isLoading: false
    }
  }
  case ACTION_GET_CITY_SUCCESED: {
    return {
      ...state,
      cities: action.payload
    }
  }
  case ACTION_GET_SLIDER_SUCCESED: {
    return {
      ...state,
      sliders: action.payload
    }
  }
  case ACTION_GET_SLIDER_FAILED: {
    return {
      ...state,
      sliders: []
    }
  }
  default: {
    return state
  }
  }
}
