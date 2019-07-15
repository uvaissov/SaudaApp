import { combineReducers } from 'redux'
import mainReducer from '../pages/Main/reducers'
import catalogReducer from '../pages/Catalog/reducers'
import authReducer from '../pages/Auth/reducers'

const reducers = combineReducers({
  main: mainReducer,
  catalog: catalogReducer,
  auth: authReducer
})
  
export default reducers
