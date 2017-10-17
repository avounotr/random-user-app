import objectAssign from 'object-assign';
import { SET_USER_OBJECT, RESET_PENDING } from '../actions/actions_users';

function userReducer (state = {
  pendingFlag: true,
  user: {},
}, action) {
  switch (action.type) {
    case SET_USER_OBJECT: {
      return objectAssign({}, state, {
        pendingFlag: false,
        user: action.payload,
      });
    }
    case RESET_PENDING: {
      return objectAssign({}, state, {
        pendingFlag: true,
      });
    }
    default: {
      return state;
    }
  }
}

export default userReducer;
