import axios from 'axios';
import { SERVER_API_TIMEOUT, SERVER_API_URL } from '../constants/app';
import * as SecurityUtils from '../../utils/security-utils';

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
    const status = err?.status ? err.status : 500;
    const response = err?.response ? err.response : '';
    if (status === 403 || status === 401) {
      onUnauthenticated();
    }
    return Promise.resolve(response);
  };

  axios.interceptors.request.use(onRequestSuccess);
  axios.interceptors.response.use(onResponseSuccess, onResponseError);
};

export default setupAxiosInterceptors;
