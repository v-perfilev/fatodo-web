import axios, {AxiosPromise, AxiosResponse} from 'axios';
import {API_TIMEOUT, API_URL} from '../constants';
import {SecurityUtils} from './utils/security.utils';
import Snack from '../models/snack.model';
import {NotificationBuilder} from './notification/notification.builder';
import {TranslationUtils} from './utils/translation.utils';
import {ResponseUtils} from './utils/response.utils';

axios.defaults.timeout = API_TIMEOUT;
axios.defaults.baseURL = API_URL;

interface SetupAxiosActions {
  onUnauthenticated: () => void;
  enqueueSnackbar: (notification: Snack) => void;
}

const setupAxiosInterceptors = (actions: SetupAxiosActions): void => {
  const handleErrorFeedback = (response: AxiosResponse): void => {
    const status = ResponseUtils.getStatus(response);
    const enqueueErrorNotification = (message: string): void => {
      const notification = new NotificationBuilder(message).setVariant('error').build();
      actions.enqueueSnackbar(notification);
    };
    if (status >= 500) {
      enqueueErrorNotification(TranslationUtils.getFeedbackTranslation('default'));
    } else if (!status) {
      enqueueErrorNotification(TranslationUtils.getFeedbackTranslation('connection'));
    }
  };

  const handleErrorStatus = (response: AxiosResponse): void => {
    const status = ResponseUtils.getStatus(response);
    if (status === 403 || status === 401) {
      actions.onUnauthenticated();
    }
  };

  const onResponseError = (err): AxiosPromise => {
    const response = err?.response ? err.response : '';
    handleErrorFeedback(response);
    handleErrorStatus(response);
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
