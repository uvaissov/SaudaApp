
import {default as uuid} from 'lodash-uuid'
import _ from 'lodash'
//import { hostName } from '../../../constants/global'
//import { transformBrand } from '../../../transform'
import { ACTION_SELECT_USER_CARD_UUID, ACTION_SELECT_USER_CITY } from '../types'
  
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
          payload: main.cities[0].id
        })
      }
    }
  } catch (error) {
    console.log(error)
  }
}
