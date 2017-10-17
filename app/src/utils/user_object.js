import Config from '../../config/config';
import ApiCallHelper from './api_call_helper';

class UserObject {
  constructor() {
    this.callHelper = new ApiCallHelper();
    this.apiToken = '';

    this.currentUser = {};
    this.users = [];

    this.login();
  }

  login() {
    this.logged = this.callHelper.post('login', '', Config.loginData);
    this.logged.then((res) => {
      this.apiToken = res.data.api_token;
    });
  }

  setUsers() {
    return this.callHelper.get('users', this.apiToken)
      .then((res) => {
        this.users = res;
        return this.users;
      });
  }

  cleanCurrentUser() {
    this.currentUser = {};
  }

  setUser(user) {
    this.currentUser = user;
  }

  getRandomUser() {
    return this.callHelper.get('user', this.apiToken)
      .then((res) => {
        this.setUser(res);
        return this.currentUser;
      });
  }
}

export default UserObject;
