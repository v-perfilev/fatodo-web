import AuthService from '../../services/auth.service';
import * as SecurityUtils from '../../utils/security.utils';
import { LoginDto } from '../../model/dto/login.dto';

export const ACTION_TYPES = {
  TOGGLE_LOGIN_MODAL: 'authState/TOGGLE_LOGIN_MODAL',
  LOGIN: 'authState/LOGIN',
  LOGOUT: 'authState/LOGOUT',
  CLEAR_AUTH: 'authState/CLEAR_AUTH',
};

export const toggleLoginModal = () => dispatch => {
  dispatch({ type: ACTION_TYPES.TOGGLE_LOGIN_MODAL });
};

export const login = (data: LoginDto, rememberMe: boolean) => async dispatch => {
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
