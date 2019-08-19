import axios from 'axios'
import {
  ACTION_PROFILE_GET_SUCCESS
} from '../types'
import { hostName } from '../../../constants/global'
import { transformProfile } from '../../../transform'
  
export const getProfileData = () => async (dispatch, getState) => {
  try {
    const { token } = getState().auth
    const { data } = await axios.get(`${hostName}/api/v1/user?api_token=${token}`)
    return transformProfile(data)
  } catch (error) {
    const { data } = error.response
    return data
  }
}

export const setProfile = (value) => {
  return {
    type: ACTION_PROFILE_GET_SUCCESS,
    payload: value
  }
}
