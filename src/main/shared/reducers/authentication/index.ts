import * as SecurityUtils from '../../security/security.utils';
import axios, { AxiosResponse } from 'axios';
import { clearAuthAction, errorMessageAction, loginAction, logoutAction, toggleLoginModalAction } from './actions';
import AuthService from '../../services/auth-service';

export const toggleLoginModal = () => dispatch => {
  dispatch(toggleLoginModalAction());
}

export const login = data => async dispatch => {
  const response = await AuthService.authenticate(data);
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
