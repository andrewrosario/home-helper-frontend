import { combineReducers } from 'redux';
import UserReducer from './userReducer'
import ProjectReducer from './projectReducer'

export default combineReducers({
  UserReducer,
  ProjectReducer
});
