import AuthService from '../../services/auth.service';
import * as SecurityUtils from '../../utils/security.utils';
import {LoginDto} from '../../model/dto/login.dto';
import UserService from '../../services/user.service';
import {setLanguageFromAccountResponse} from '../../utils/language.utils';

export const ACTION_TYPES = {
  LOGIN: 'authState/LOGIN',
  LOGOUT: 'authState/LOGOUT',
  ACCOUNT: 'authState/ACCOUNT',
  CLEAR_AUTH: 'authState/CLEAR_AUTH',
};

export const login = (data: LoginDto, rememberMe: boolean, onSuccess: () => void, onFailure: () => void) => async (
  dispatch
): Promise<void> => {
  const authResponse = await dispatch({
    type: ACTION_TYPES.LOGIN,
    payload: AuthService.authenticate(data).catch(onFailure),
  });
  const token = SecurityUtils.parseTokenFromAuthResponse(authResponse);
  if (token) {
    SecurityUtils.saveAuthToken(token, rememberMe);
    const accountResponse = await dispatch({
      type: ACTION_TYPES.ACCOUNT,
      payload: UserService.getCurrentUser(),
    });
    setLanguageFromAccountResponse(accountResponse);
    onSuccess();
  } else {
    dispatch({type: ACTION_TYPES.CLEAR_AUTH});
    onFailure();
  }
};

export const logout = () => (dispatch): void => {
  SecurityUtils.clearAuthToken();
  dispatch({type: ACTION_TYPES.LOGOUT});
};

export const clearAuth = () => (dispatch): void => {
  SecurityUtils.clearAuthToken();
  dispatch({type: ACTION_TYPES.CLEAR_AUTH});
};
