import objectAssign from 'object-assign';

import store from '../stores/configure_store';
export const SET_USER_OBJECT = 'SET_USER_OBJECT';
export const RESET_PENDING = 'RESET_PENDING';

function setUserObjectAction(user) {
  return {
    type: SET_USER_OBJECT,
    payload: user,
  };
}

function resetPendingAction() {
  return {
    type: RESET_PENDING,
  };
}

export function setUsers() {
  return (dispatch, getState) => {
    dispatch(resetPendingAction());
    getState().userInitialState.user.setUsers()
      .then((res) => {
        const userObject = objectAssign({}, getState().userInitialState.user, { users: res });
        dispatch(setUserObjectAction(userObject));
      });
  };
}

export function setCurrentUser(user) {
  return (dispatch, getState) => {
    dispatch(resetPendingAction());
    const userObject = objectAssign({}, getState().userState.user, {
      currentUser: user,
    });
    dispatch(setUserObjectAction(userObject));
  }
}

export function setRandomUser() {
  return (dispatch, getState) => {
    getState().userInitialState.user.getRandomUser()
      .then((res) => {
        dispatch(setCurrentUser(res));
      });
  }
}

export function removeCurrentUser() {
  return setCurrentUser({});
}
