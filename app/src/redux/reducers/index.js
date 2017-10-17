import { combineReducers } from 'redux';
import UserReducer from './reducers_users';

const rootReducer = combineReducers({
  userInitialState: (state = {}) => state,
  userState: UserReducer,
});

export default rootReducer;
