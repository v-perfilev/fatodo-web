import AccountService from '../../services/account.service';
import * as SecurityUtils from '../../shared/utils/security.utils';
import {LoginDTO} from '../../models/dto/login.dto';
import UserService from '../../services/user.service';
import {setLanguageFromAccountResponse} from '../../shared/utils/language.utils';

export const ACTION_TYPES = {
  LOGIN: 'authState/LOGIN',
  LOGOUT: 'authState/LOGOUT',
  ACCOUNT: 'authState/ACCOUNT',
  CLEAR_AUTH: 'authState/CLEAR_AUTH',
};

export const login = (data: LoginDTO, rememberMe: boolean, onSuccess: () => void, onFailure: () => void) => async (
  dispatch
): Promise<void> => {
  const authResponse = await dispatch({
    type: ACTION_TYPES.LOGIN,
    payload: AccountService.authenticate(data).catch(onFailure),
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
