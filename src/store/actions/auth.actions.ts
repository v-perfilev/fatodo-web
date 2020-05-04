import AuthService from '../../services/auth.service';
import * as SecurityUtils from '../../utils/security.utils';
import {LoginDto} from '../../model/dto/login.dto';
import UserService from '../../services/user.service';

export const ACTION_TYPES = {
  LOGIN: 'authState/LOGIN',
  LOGOUT: 'authState/LOGOUT',
  ACCOUNT: 'authState/ACCOUNT',
  CLEAR_AUTH: 'authState/CLEAR_AUTH',
};

export const login = (
  data: LoginDto,
  rememberMe: boolean,
  successCallback: () => void,
  failureCallback: () => void
) => async (dispatch): Promise<any> => {
  const response = await dispatch({
    type: ACTION_TYPES.LOGIN,
    payload: AuthService.authenticate(data).catch(failureCallback),
  });
  const token = SecurityUtils.parseToken(response);
  if (token) {
    SecurityUtils.saveAuthToken(token, rememberMe);
    dispatch({
      type: ACTION_TYPES.ACCOUNT,
      payload: UserService.getCurrentUser(),
    });
    successCallback();
  } else {
    dispatch({type: ACTION_TYPES.CLEAR_AUTH});
    failureCallback();
  }
};

export const logout = () => (dispatch): any => {
  SecurityUtils.clearAuthToken();
  dispatch({type: ACTION_TYPES.LOGOUT});
};

export const clearAuth = () => (dispatch): any => {
  SecurityUtils.clearAuthToken();
  dispatch({type: ACTION_TYPES.CLEAR_AUTH});
};
