
import {default as uuid} from 'lodash-uuid'
import _ from 'lodash'
import axios from 'axios'
import { hostName } from '../../../constants/global'
//import { transformBrand } from '../../../transform'
import { ACTION_SELECT_USER_CARD_UUID, ACTION_SELECT_USER_CITY, ACTION_SET_TOKEN } from '../types'
  
export const init = () => async (dispatch, getState) => {  
  try {
    const { auth, main } = getState()
    console.log('auth', auth, main)
    if (_.isEmpty(auth.cardUuid)) {
      dispatch({
        type: ACTION_SELECT_USER_CARD_UUID,
        payload: uuid.uuid()
      })
    }
    if (_.isEmpty(auth.city)) {
      if (_.isArray(main.cities) && main.cities.length > 0) {        
        dispatch({
          type: ACTION_SELECT_USER_CITY,
          payload: main.cities[0].key
        })
      }
    }
  } catch (error) {
    console.log(error)
  }
}

export const selectCity = (value) => {
  return {
    type: ACTION_SELECT_USER_CITY,
    payload: value
  }
}

export const register = (mail, name, password, confirm) => async (dispatch) => {  
  try {
    const { data } = await axios.post(`${hostName}/api/v1/register?email=${mail}&name=${name}&password=${password}&password_confirmation=${confirm}&address=Test`)
    dispatch({
      type: ACTION_SET_TOKEN,
      payload: data.token
    })
    return data
  } catch (error) {
    const { data } = error.response
    return data
  }
}

export const login = (mail, password) => async (dispatch) => {  
  try {
    const { data } = await axios.post(`${hostName}/api/v1/login?email=${mail}&password=${password}`)
    dispatch({
      type: ACTION_SET_TOKEN,
      payload: data.token
    })
    return data
  } catch (error) {
    const { data } = error.response
    return data
  }
}
