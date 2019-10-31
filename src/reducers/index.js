import { combineReducers } from 'redux';
import NewUserReducer from './newUserReducer'
import LoginReducer from './loginReducer'

export default combineReducers({
  NewUserReducer,
  LoginReducer
});
