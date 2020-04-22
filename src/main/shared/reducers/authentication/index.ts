import * as SecurityUtils from '../../security/security.utils';
import axios from 'axios';
import { clearAuthAction, errorMessageAction, loginAction, logoutAction } from './actions';

export const login = formData => async dispatch => {
  const data = {
    username: formData.username,
    password: formData.password,
    rememberMe: formData.rememberMe
  };
  const response = await axios.post('api/authenticate', data);
  const parseToken = t => ( t && t.slice(0, 7) === 'Bearer ' ? t.slice(7, t.length) : null );
  const token = parseToken(response.headers.authorization);
  SecurityUtils.clearAuthToken();
  if (token) {
    SecurityUtils.saveAuthToken(token, data.rememberMe);
  }
  dispatch(loginAction(response));
};

export const logout = () => dispatch => {
  dispatch(logoutAction());
  SecurityUtils.clearAuthToken();
};

export const clearAuth = message => dispatch => {
  SecurityUtils.clearAuthToken();
  dispatch(errorMessageAction(message));
  dispatch(clearAuthAction());
};
