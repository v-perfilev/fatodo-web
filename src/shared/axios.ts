import axios from 'axios';
import {SERVER_API_TIMEOUT, SERVER_API_URL} from '../constants';
import * as SecurityUtils from '../utils/security.utils';
import Notification from '../models/notification.model';
import {handleNotificationFromErrorResponse, handleStatusFromErrorResponse} from '../utils/notification.helpers';

axios.defaults.timeout = SERVER_API_TIMEOUT;
axios.defaults.baseURL = SERVER_API_URL;

interface SetupAxiosActions {
  onUnauthenticated: () => void;
  enqueueSnackbar: (notification: Notification) => void;
}

const setupAxiosInterceptors = (actions: SetupAxiosActions): void => {
  const onRequestSuccess = (request): any => {
    const token = SecurityUtils.getAuthToken();
    if (token) {
      request.headers.authorization = `Bearer ${token}`;
    }
    return request;
  };

  const onResponseSuccess = (response): Promise<any> => response;

  const onResponseError = (err): Promise<any> => {
    const response = err?.response ? err.response : '';
    handleStatusFromErrorResponse(response, actions.onUnauthenticated);
    handleNotificationFromErrorResponse(response, actions.enqueueSnackbar);
    return Promise.reject(response);
  };

  axios.interceptors.request.use(onRequestSuccess);
  axios.interceptors.response.use(onResponseSuccess, onResponseError);
};

export default setupAxiosInterceptors;
