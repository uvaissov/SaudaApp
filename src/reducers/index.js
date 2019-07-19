import { combineReducers } from 'redux'
import mainReducer from '../pages/Main/reducers'
import catalogReducer from '../pages/Catalog/reducers'
import authReducer from '../pages/Auth/reducers'
import cardReducer from '../pages/Card/reducers'
import favReducer from '../pages/Favorite/reducers'

const reducers = combineReducers({
  main: mainReducer,
  catalog: catalogReducer,
  auth: authReducer,
  card: cardReducer,
  favorite: favReducer
})
  
export default reducers
