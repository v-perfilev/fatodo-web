import axios, {AxiosPromise, AxiosResponse} from 'axios';
import {SERVER_API_TIMEOUT, SERVER_API_URL} from '../constants';
import {SecurityUtils} from './utils/security.utils';
import Notification from '../models/notification.model';
import {NotificationBuilder} from './notification/notification.builder';
import {ResponseUtils} from './utils/response.utils';

axios.defaults.timeout = SERVER_API_TIMEOUT;
axios.defaults.baseURL = SERVER_API_URL;

interface SetupAxiosActions {
  onUnauthenticated: () => void;
  enqueueSnackbar: (notification: Notification) => void;
}

const setupAxiosInterceptors = (actions: SetupAxiosActions): void => {
  const handleErrorFeedback = (response: AxiosResponse, enqueueSnackbar: (n: Notification) => void): void => {
    const status = response?.status;
    const enqueueErrorNotification = (message: string): void => {
      const notification = new NotificationBuilder(message).setVariant('error').build();
      enqueueSnackbar(notification);
    };
    if (status >= 500) {
      enqueueErrorNotification(ResponseUtils.getFeedbackTranslation('default'));
    } else if (!status) {
      enqueueErrorNotification(ResponseUtils.getFeedbackTranslation('connection'));
    }
  };

  const handleErrorStatus = (response: AxiosResponse, onUnauthenticated: () => void): void => {
    const status = response?.status;
    if (status === 403 || status === 401) {
      onUnauthenticated();
    }
  };

  const onResponseError = (err): AxiosPromise => {
    const response = err?.response ? err.response : '';
    handleErrorFeedback(response, actions.enqueueSnackbar);
    handleErrorStatus(response, actions.onUnauthenticated);
    return Promise.reject(response);
  };

  const onRequestSuccess = (request): any => {
    const token = SecurityUtils.getAuthToken();
    if (token) {
      request.headers.authorization = `Bearer ${token}`;
    }
    return request;
  };

  const onResponseSuccess = (response): AxiosPromise => response;

  axios.interceptors.request.use(onRequestSuccess);
  axios.interceptors.response.use(onResponseSuccess, onResponseError);
};

export default setupAxiosInterceptors;
