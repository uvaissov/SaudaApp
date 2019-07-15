import axios from 'axios'
import { hostName } from '../../../constants/global'
import { transformCategory } from '../../../transform'
import {
  ACTION_GET_CATEGORIOS_SUCCESED,
  ACTION_GET_CATEGORIOS_FAILED,
  ACTION_GET_CATEGORIOS_STARTED
} from '../types'
  
export const getCategories = () => async dispatch => {  
  try {
    dispatch({
      type: ACTION_GET_CATEGORIOS_STARTED
    })
    const response = await axios.get(`${hostName}/api/v1/categories/`)
    console.log(response)
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
