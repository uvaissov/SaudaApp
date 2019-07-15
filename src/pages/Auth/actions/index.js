
import {default as uuid} from 'lodash-uuid'
import _ from 'lodash'
//import { hostName } from '../../../constants/global'
//import { transformBrand } from '../../../transform'
import { ACTION_SELECT_USER_CARD_UUID } from '../types'
  
export const init = () => async (dispatch, getState) => {  
  try {
    const { auth } = getState()
    if (!auth.cardUuid) {
      dispatch({
        type: ACTION_SELECT_USER_CARD_UUID,
        payload: uuid.uuid()
      })
    }
    if (_.isEmpty(auth.city)) {
      console.log('ísEmpry')
    }
  } catch (error) {
    console.log(error)
  }
}
