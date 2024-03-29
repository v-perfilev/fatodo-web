import axios, {AxiosError, AxiosRequestConfig, AxiosResponse} from 'axios';
import {API_TIMEOUT, API_URL} from '../constants';
import {SecurityUtils} from './utils/SecurityUtils';
import {ResponseUtils} from './utils/ResponseUtils';
import {TranslationUtils} from './utils/TranslationUtils';
import {Snack, SnackBuilder} from '../models/Snack';
import axiosRetry from 'axios-retry';
import qs from 'qs';

axios.defaults.timeout = API_TIMEOUT;
axios.defaults.baseURL = API_URL;
axios.defaults.paramsSerializer = (params: any) => qs.stringify(params, {arrayFormat: 'comma'});

export const axiosDefault = axios.create();
export const axiosIgnore404 = axios.create();
export const axiosIgnoreAll = axios.create();

const retryDelay = axiosRetry.exponentialDelay;
const retryCondition = (error: AxiosError) => !error.response && error.config.method.toLowerCase() === 'get';
axiosRetry(axiosDefault, {retryDelay, retryCondition});
axiosRetry(axiosIgnore404, {retryDelay, retryCondition});
axiosRetry(axiosIgnoreAll, {retryDelay, retryCondition});

interface SetupAxiosActions {
  onUnauthenticated: () => void;
  enqueueSnack: (snack: Snack) => void;
  handleResponse: (status: number, feedbackCode: string) => void;
}

export const setupAxiosInterceptors = ({onUnauthenticated, enqueueSnack, handleResponse}: SetupAxiosActions): void => {
  const logRequest = (request: AxiosRequestConfig): void => {
    const consoleMsg = `Request sent: ${request.method.toUpperCase()} ${request.url}`;
    console.info(consoleMsg);
  };

  const logError = (response: AxiosResponse): void => {
    const responsePath = response?.data.path || 'unknown path';
    const responseMsg = response?.data.message || 'no message';
    const consoleMsg = `Request failed: ${responsePath} - ${response?.status}:  ${responseMsg}`;
    console.warn(consoleMsg);
  };

  const enqueueErrorSnack = (message: string): void => {
    const snack = new SnackBuilder(message).setVariantColor('error').build();
    enqueueSnack(snack);
  };

  const defaultHandleErrorFeedback = (response: AxiosResponse): void => {
    const status = ResponseUtils.getStatus(response);
    if (status >= 500) {
      enqueueErrorSnack(TranslationUtils.getFeedbackTranslation('default'));
      logError(response);
    } else if (!status) {
      enqueueErrorSnack(TranslationUtils.getFeedbackTranslation('connection'));
      logError(response);
    } else {
      const feedbackCode = ResponseUtils.getFeedbackCode(response);
      handleResponse(status, feedbackCode);
      logError(response);
    }
  };

  const ignore404handleErrorFeedback = (response: AxiosResponse): void => {
    const status = ResponseUtils.getStatus(response);
    if (status >= 500) {
      enqueueErrorSnack(TranslationUtils.getFeedbackTranslation('default'));
      logError(response);
    } else if (!status) {
      enqueueErrorSnack(TranslationUtils.getFeedbackTranslation('connection'));
      logError(response);
    } else if (status !== 404) {
      const feedbackCode = ResponseUtils.getFeedbackCode(response);
      handleResponse(status, feedbackCode);
      logError(response);
    }
  };

  const handleErrorStatus = (response: AxiosResponse): void => {
    const status = ResponseUtils.getStatus(response);
    if (status === 401) {
      onUnauthenticated();
    }
  };

  const defaultOnResponseError = (err: AxiosError): Promise<AxiosResponse> => {
    defaultHandleErrorFeedback(err.response);
    handleErrorStatus(err.response);
    return Promise.reject(err.response);
  };

  const ignore404OnResponseError = (err: AxiosError): Promise<AxiosResponse> => {
    ignore404handleErrorFeedback(err.response);
    handleErrorStatus(err.response);
    return Promise.reject(err.response);
  };

  const ignoreAllOnResponseError = (err: AxiosError): Promise<AxiosResponse> => {
    handleErrorStatus(err.response);
    return Promise.reject(err.response);
  };

  const onRequest = async (request: AxiosRequestConfig): Promise<AxiosRequestConfig> => {
    const token = await SecurityUtils.getAuthToken();
    if (token) {
      request.headers.authorization = `Bearer ${token}`;
    }
    logRequest(request);
    return request;
  };

  const onResponseSuccess = (response: AxiosResponse): AxiosResponse => {
    return response;
  };

  axiosDefault.interceptors.request.use(onRequest);
  axiosDefault.interceptors.response.use(onResponseSuccess, defaultOnResponseError);

  axiosIgnore404.interceptors.request.use(onRequest);
  axiosIgnore404.interceptors.response.use(onResponseSuccess, ignore404OnResponseError);

  axiosIgnoreAll.interceptors.request.use(onRequest);
  axiosIgnoreAll.interceptors.response.use(onResponseSuccess, ignoreAllOnResponseError);
};

export default axiosDefault;
