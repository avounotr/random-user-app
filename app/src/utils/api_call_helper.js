import axios from 'axios';
import objectAssign from 'object-assign';

import Config from '../../config/config';

class ApiCallHelper {
  constructor() {
    this.headers = {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
    };
  }

  setHeaders(apiToken = '') {
    return apiToken === '' ? this.headers :
      objectAssign({}, this.headers, {
        'Authorization': `Bearer ${apiToken}`,
      });
  }

  get(endpoint, apiToken = '') {
    const callUrl = `${Config.apiUrl}/${endpoint}`;
    const headers = this.setHeaders(apiToken);

    return new Promise((resolve, reject) => {
      axios
        .get(callUrl, { headers })
        .then((res) => { resolve(res.data); })
        .catch((err) => {  reject(err); })
    });
  }

  post(endpoint, apiToken = '', data = {}) {
    const callUrl = `${Config.apiUrl}/${endpoint}`;
    const headers = this.setHeaders(apiToken);

    return new Promise((resolve, reject) => {
      axios
        .post(callUrl, data, { headers })
        .then((res) => { resolve(res.data); })
        .catch((err) => {  reject(err); })
    });
  }
}

export default ApiCallHelper;
