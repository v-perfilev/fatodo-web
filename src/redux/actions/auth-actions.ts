import AuthService from '../../services/auth-service';
import * as SecurityUtils from '../../utils/security-utils';
import { LoginDTO } from '../../model/dto/login-dto';

export const ACTION_TYPES = {
  TOGGLE_LOGIN_MODAL: 'authentication/TOGGLE_LOGIN_MODAL',
  LOGIN: 'authentication/LOGIN',
  LOGOUT: 'authentication/LOGOUT',
  CLEAR_AUTH: 'authentication/CLEAR_AUTH',
  ERROR_MESSAGE: 'authentication/ERROR_MESSAGE',
};

export const toggleLoginModal = () => dispatch => {
  dispatch({ type: ACTION_TYPES.TOGGLE_LOGIN_MODAL });
};

export const login = (data: LoginDTO, rememberMe: boolean) => async dispatch => {
  SecurityUtils.clearAuthToken();
  const response = await dispatch({
    type: ACTION_TYPES.LOGIN,
    payload: AuthService.authenticate(data),
  });
  if (response?.headers?.authorization) {
    const token = SecurityUtils.parseToken(response.headers.authorization);
    if (token) {
      SecurityUtils.saveAuthToken(token, rememberMe);
    }
  }
};

export const logout = () => dispatch => {
  SecurityUtils.clearAuthToken();
  dispatch({ type: ACTION_TYPES.LOGOUT });
};

export const clearAuth = () => dispatch => {
  SecurityUtils.clearAuthToken();
  dispatch({ type: ACTION_TYPES.CLEAR_AUTH });
};
