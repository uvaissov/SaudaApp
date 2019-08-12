import axios from 'axios'
import { hostName } from '../../../constants/global'
import { transformCategory, transformProduct, transformCity } from '../../../transform'
import {
  ACTION_GET_CATEGORIOS_SUCCESED,
  ACTION_GET_CATEGORIOS_FAILED,
  ACTION_GET_CATEGORIOS_STARTED,
  ACTION_GET_CITY_SUCCESED,
  ACTION_GET_CITY_FAILED,
  ACTION_GET_SLIDER_SUCCESED,
  ACTION_GET_SLIDER_FAILED
} from '../types'
  
export const getCategories = () => async dispatch => {  
  try {
    dispatch({
      type: ACTION_GET_CATEGORIOS_STARTED
    })
    const response = await axios.get(`${hostName}/api/v1/categories/`)
    const data = response.data.map((row) => transformCategory(row))
    dispatch({
      type: ACTION_GET_CATEGORIOS_SUCCESED,
      payload: data
    })
  } catch (error) {
    dispatch({
      type: ACTION_GET_CATEGORIOS_FAILED,
      error
    })
  }
}

export const getSliders = () => async dispatch => {  
  try {
    const response = await axios.get(`${hostName}/api/v1/sliders`)
    const data = response.data.map((row) => transformProduct(row))
    dispatch({
      type: ACTION_GET_SLIDER_SUCCESED,
      payload: data
    })
  } catch (error) {
    dispatch({
      type: ACTION_GET_SLIDER_FAILED,
      error
    })
  }
}

export const getCities = () => async dispatch => {  
  try {
    dispatch({
      type: ACTION_GET_CATEGORIOS_STARTED
    })
    const response = await axios.get(`${hostName}/api/v1/cities`)
    const data = response.data.map((row) => transformCity(row))
    dispatch({
      type: ACTION_GET_CITY_SUCCESED,
      payload: data
    })
  } catch (error) {
    dispatch({
      type: ACTION_GET_CITY_FAILED,
      error
    })
  }
}
