import axios from 'axios';
import { SERVER_API_TIMEOUT, SERVER_API_URL } from '../constants';
import * as SecurityUtils from '../../utils/security.utils';
import Notification from '../../model/notification.model';
import { NotificationBuilder } from '../../utils/notification.builder';

axios.defaults.timeout = SERVER_API_TIMEOUT;
axios.defaults.baseURL = SERVER_API_URL;

interface ISetupAxiosActions {
  onUnauthenticated: () => void;
  enqueueSnackbar: (notification: Notification) => void;
}

const setupAxiosInterceptors = (actions: ISetupAxiosActions) => {
  const onRequestSuccess = config => {
    const token = SecurityUtils.getAuthToken();
    if (token) {
      config.headers.authorization = `Bearer ${token}`;
    }
    return config;
  };

  const onResponseSuccess = response => response;

  const onResponseError = err => {
    const status = err?.status ? err.status : null;
    const response = err?.response ? err.response : '';
    if (status === 403 || status === 401) {
      actions.onUnauthenticated();
    }
    const notification = new NotificationBuilder('test1 test1 test1 tes').setVariant('warning').build();
    actions.enqueueSnackbar(notification);
    return Promise.resolve(response);
  };

  axios.interceptors.request.use(onRequestSuccess);
  axios.interceptors.response.use(onResponseSuccess, onResponseError);
};

export default setupAxiosInterceptors;
