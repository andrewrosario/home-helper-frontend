import { combineReducers } from 'redux';
import UserReducer from './userReducer'
import ProjectReducer from './projectReducer'
import ChatRoomReducer from './chatRoomReducer'
import SocketReducer from './socketReducer'

export default combineReducers({
  UserReducer,
  ProjectReducer,
  ChatRoomReducer,
  SocketReducer
});
