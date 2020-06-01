import axios from 'axios';
import {SERVER_API_TIMEOUT, SERVER_API_URL} from '../constants';
import * as SecurityUtils from './utils/security.utils';
import Notification from '../models/notification.model';
import i18n from './i18n';
import {VariantType} from 'notistack';
import {NotificationBuilder} from './notification/notification.builder';

axios.defaults.timeout = SERVER_API_TIMEOUT;
axios.defaults.baseURL = SERVER_API_URL;

interface SetupAxiosActions {
  onUnauthenticated: () => void;
  enqueueSnackbar: (notification: Notification) => void;
}

const getFeedbackTranslation = (message: string): string =>
  message && i18n.exists('feedback:' + message) ? i18n.t('feedback:' + message) : null;

const getNotificationVariant = (status: number): VariantType => {
  if (status >= 400 && status < 500) {
    return 'warning';
  } else if (status >= 500) {
    return 'error';
  } else {
    return 'default';
  }
};

const enqueueNotification = (message: string, status: number, enqueueSnackbar: (n: Notification) => void): void => {
  const variant = getNotificationVariant(status);
  const notification = new NotificationBuilder(message).setVariant(variant).build();
  enqueueSnackbar(notification);
};

const handleFeedback = (response: any, enqueueSnackbar: (n: Notification) => void): void => {
  const translatedMessage = getFeedbackTranslation(response?.data?.feedbackCode);
  const status = response?.status;
  if (translatedMessage && status) {
    enqueueNotification(translatedMessage, status, enqueueSnackbar);
  } else if (status >= 500) {
    enqueueNotification(getFeedbackTranslation('default'), 500, enqueueSnackbar);
  } else if (!status) {
    enqueueNotification(getFeedbackTranslation('connection'), 500, enqueueSnackbar);
  }
};

const handleStatus = (response: any, onUnauthenticated: () => void): void => {
  const status = response?.status;
  if (status === 403 || status === 401) {
    onUnauthenticated();
  }
};

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
    handleFeedback(response, actions.enqueueSnackbar);
    handleStatus(response, actions.onUnauthenticated);
    return Promise.reject(response);
  };

  axios.interceptors.request.use(onRequestSuccess);
  axios.interceptors.response.use(onResponseSuccess, onResponseError);
};

export default setupAxiosInterceptors;
