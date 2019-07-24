import { combineReducers } from 'redux'
import mainReducer from '../pages/Main/reducers'
import catalogReducer from '../pages/Catalog/reducers'
import authReducer from '../pages/Auth/reducers'
import cardReducer from '../pages/Card/reducers'
import favReducer from '../pages/Favorite/reducers'
import profileReducer from '../pages/Profile/reducers'

const reducers = combineReducers({
  main: mainReducer,
  catalog: catalogReducer,
  auth: authReducer,
  card: cardReducer,
  favorite: favReducer,
  profile: profileReducer
})
  
export default reducers
