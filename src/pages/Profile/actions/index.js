import axios from 'axios'
import {
  ACTION_PROFILE_GET_SUCCESS,
  ACTION_PROFILE_GET_FAILED
} from '../types'
import { hostName } from '../../../constants/global'
import { transformProfile } from '../../../transform'
  
export const getProfileData = () => async (dispatch, getState) => {
  try {
    const { token } = getState().auth
    const { data } = await axios.get(`${hostName}/api/v1/user?api_token=${token}`)
    console.log(data)
    dispatch({
      type: ACTION_PROFILE_GET_SUCCESS,
      ...transformProfile(data) 
    })
  } catch (error) {
    dispatch({
      type: ACTION_PROFILE_GET_FAILED,
      error
    })
  }
}
  