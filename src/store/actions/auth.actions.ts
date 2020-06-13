import {SecurityUtils} from '../../shared/utils/security.utils';
import UserService from '../../services/user.service';
import {LanguageUtils} from '../../shared/utils/language.utils';

export const ACTION_TYPES = {
  LOGIN: 'authState/LOGIN',
  LOGOUT: 'authState/LOGOUT',
  ACCOUNT: 'authState/ACCOUNT',
  CLEAR_AUTH: 'authState/CLEAR_AUTH',
};

export const clearAuth = () => (dispatch): void => {
  SecurityUtils.clearAuthToken();
  dispatch({type: ACTION_TYPES.CLEAR_AUTH});
};

export const login = (token: string, rememberMe: boolean, onSuccess: () => void, onFailure: () => void) => async (
  dispatch
): Promise<void> => {
  try {
    if (!token) {
      throw new Error();
    }
    SecurityUtils.saveAuthToken(token, rememberMe);
    const accountResponse = await UserService.getCurrentUser();
    LanguageUtils.setLanguageFromUser(accountResponse.data);
    dispatch({type: ACTION_TYPES.LOGIN});
    dispatch({type: ACTION_TYPES.ACCOUNT, account: accountResponse.data});
    onSuccess();
  } catch (e) {
    clearAuth();
    onFailure();
  }
};

export const logout = () => (dispatch): void => {
  SecurityUtils.clearAuthToken();
  dispatch({type: ACTION_TYPES.LOGOUT});
};
