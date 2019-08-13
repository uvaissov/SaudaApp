
import {default as uuid} from 'lodash-uuid'
import _ from 'lodash'
import axios from 'axios'
import { hostName } from '../../../constants/global'
//import { transformBrand } from '../../../transform'
import { ACTION_SELECT_USER_CARD_UUID, ACTION_SELECT_USER_CITY, ACTION_SET_TOKEN } from '../types'
  
export const init = () => async (dispatch, getState) => {  
  try {
    const { auth, main } = getState()
    if (!auth.cardUuid) { //Если нет идентификатора корхины надо содать новый
      dispatch({
        type: ACTION_SELECT_USER_CARD_UUID,
        payload: uuid.uuid()
      })
    }
    if (!auth.city) { //Если нет города по поставим первый
      if (_.isArray(main.cities) && main.cities.length > 0) {        
        dispatch({
          type: ACTION_SELECT_USER_CITY,
          payload: main.cities[0].key
        })
      }
    }

    if (auth.token) { //Если есть токен авторизации, надо его проверить на актуальность
      try {
        const { token } = auth
        await axios.get(`${hostName}/api/v1/user?api_token=${token}`)
      } catch (error) {
        if (error.response.status === 401) { //Unauthenticated
          dispatch({
            type: ACTION_SET_TOKEN,
            payload: undefined
          })
        }
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

export const exit = () => {
  return {
    type: ACTION_SET_TOKEN,
    payload: undefined
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
