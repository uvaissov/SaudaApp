import {
  ACTION_ADD_FAV_ITEM,
  ACTION_REM_FAV_ITEM
} from '../types'

export const toFav = (value) => {
  return {
    type: ACTION_ADD_FAV_ITEM,
    payload: value
  }
}

export const remFromFav = (value) => {
  return {
    type: ACTION_REM_FAV_ITEM,
    payload: value
  }
}
