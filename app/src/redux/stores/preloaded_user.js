import UserObject from '../../utils/user_object';

function preloadedUser() {
  const user = new UserObject();
  return { user, pendingFlag: true };
}

export default preloadedUser;
