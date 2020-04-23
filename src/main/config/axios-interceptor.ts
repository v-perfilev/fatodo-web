import axios from 'axios';
import { SERVER_API_TIMEOUT, SERVER_API_URL } from './constants/app';
import * as SecurityUtils from '../shared/security/security.utils';

axios.defaults.timeout = SERVER_API_TIMEOUT;
axios.defaults.baseURL = SERVER_API_URL;

const setupAxiosInterceptors = onUnauthenticated => {
  const onRequestSuccess = config => {
    const token = SecurityUtils.getAuthToken();
    if (token) {
      config.headers.authorization = `Bearer ${token}`;
    }
    return config;
  };

  const onResponseSuccess = response => response;

  const onResponseError = err => {
    const status = err && err.status ? err.status
      : err && err.response && err.response.status ? err.response.status
        : 500;
    if (status === 403 || status === 401) {
      onUnauthenticated();
    }
    return Promise.reject(err);
  };

  axios.interceptors.request.use(onRequestSuccess);
  axios.interceptors.response.use(onResponseSuccess, onResponseError);
};

export default setupAxiosInterceptors;
