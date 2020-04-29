import AuthService from '../../services/auth.service';
import * as SecurityUtils from '../../utils/security.utils';
import { LoginDto } from '../../model/dto/login.dto';
import UserService from '../../services/user.service';

export const ACTION_TYPES = {
  TOGGLE_LOGIN_MODAL: 'authState/TOGGLE_LOGIN_MODAL',
  LOGIN: 'authState/LOGIN',
  LOGOUT: 'authState/LOGOUT',
  ACCOUNT: 'authState/ACCOUNT',
  CLEAR_AUTH: 'authState/CLEAR_AUTH',
};

export const toggleLoginModal = () => dispatch => {
  dispatch({ type: ACTION_TYPES.TOGGLE_LOGIN_MODAL });
};

export const login = (data: LoginDto, rememberMe: boolean) => async dispatch => {
  const response = await dispatch({
    type: ACTION_TYPES.LOGIN,
    payload: AuthService.authenticate(data),
  });
  const token = SecurityUtils.parseToken(response);
  if (token) {
    SecurityUtils.saveAuthToken(token, rememberMe);
    dispatch({
      type: ACTION_TYPES.ACCOUNT,
      payload: UserService.getCurrentUser(),
    });
  } else {
    dispatch({ type: ACTION_TYPES.CLEAR_AUTH });
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
