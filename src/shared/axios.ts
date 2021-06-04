import axios, {AxiosPromise, AxiosResponse} from 'axios';
import {API_TIMEOUT, API_URL, BASE_URL} from '../constants';
import {SecurityUtils} from './utils/security.utils';
import {TranslationUtils} from './utils/translation.utils';
import {ResponseUtils} from './utils/response.utils';
import {SnackBuilder} from './utils/builders/snack.builder';
import Snack from '../models/snack.model';

axios.defaults.timeout = API_TIMEOUT;
axios.defaults.baseURL = API_URL;

console.log('Base url: ' + BASE_URL);
console.log('Api url: ' + API_URL);

interface SetupAxiosActions {
  onUnauthenticated: () => void;
  enqueueReduxSnackbar: (snack: Snack) => void;
}

const setupAxiosInterceptors = ({onUnauthenticated, enqueueReduxSnackbar}: SetupAxiosActions): void => {
  const enqueueErrorNotification = (message: string): void => {
    const snack = new SnackBuilder(message).setVariant('error').build();
    enqueueReduxSnackbar(snack);
  };

  const handleErrorFeedback = (response: AxiosResponse): void => {
    const status = ResponseUtils.getStatus(response);
    if (status >= 500) {
      enqueueErrorNotification(TranslationUtils.getFeedbackTranslation('default'));
    } else if (!status) {
      enqueueErrorNotification(TranslationUtils.getFeedbackTranslation('connection'));
    }
  };

  const handleErrorStatus = (response: AxiosResponse): void => {
    const status = ResponseUtils.getStatus(response);
    if (status === 403 || status === 401) {
      onUnauthenticated();
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
