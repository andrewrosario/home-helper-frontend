import { combineReducers } from 'redux';
import NewUserReducer from './newUserReducer'
import LoginReducer from './loginReducer'
import ProjectReducer from './projectReducer'

export default combineReducers({
  NewUserReducer,
  LoginReducer,
  ProjectReducer
});
