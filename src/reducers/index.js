import { combineReducers } from 'redux'
import mainReducer from '../pages/Main/reducers'
import catalogReducer from '../pages/Catalog/reducers'

const reducers = combineReducers({
  main: mainReducer,
  catalog: catalogReducer
})
  
export default reducers
