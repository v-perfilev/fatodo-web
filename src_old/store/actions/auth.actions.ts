import {SecurityUtils} from '../../shared/utils/security.utils';
import UserService from '../../services/user.service';
import {LanguageUtils} from '../../shared/utils/language.utils';

export const ACTION_TYPES = {
  LOGIN: 'authState/LOGIN',
  LOGOUT: 'authState/LOGOUT',
  ACCOUNT: 'authState/ACCOUNT',
  CLEAR_AUTH: 'authState/CLEAR_AUTH',
};

export const clearAuth = () => (dispatch: any): void => {
  SecurityUtils.clearAuthToken();
  dispatch({type: ACTION_TYPES.CLEAR_AUTH});
};

export const login = (token?: string, rememberMe?: boolean) => async (dispatch): Promise<void> => {
  if (token) {
    SecurityUtils.saveAuthToken(token, rememberMe);
  }
  dispatch({type: ACTION_TYPES.LOGIN});
};

export const requestAccountData = (onSuccess?: () => void, onFailure?: () => void) => async (
  dispatch,
): Promise<void> => {
  try {
    const accountResponse = await UserService.getCurrent();
    LanguageUtils.setLanguageFromUser(accountResponse.data);
    dispatch({type: ACTION_TYPES.ACCOUNT, account: accountResponse.data});
    if (onSuccess) {
      onSuccess();
    }
  } catch (e) {
    clearAuth();
    if (onFailure) {
      onFailure();
    }
  }
};

export const logout = () => (dispatch): void => {
  SecurityUtils.clearAuthToken();
  dispatch({type: ACTION_TYPES.LOGOUT});
};
