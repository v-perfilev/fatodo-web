import {AUTHORIZATION_HEADER} from '../../constants';
import {AxiosResponse} from 'axios';

const AUTH_TOKEN_KEY = 'token';

export class SecurityUtils {
  public static removeFromStorage = (storage, key): void => {
    if (storage.getItem(key)) {
      storage.removeItem(key);
    }
  };

  public static clearAuthToken = (): void => {
    SecurityUtils.removeFromStorage(localStorage, AUTH_TOKEN_KEY);
    SecurityUtils.removeFromStorage(sessionStorage, AUTH_TOKEN_KEY);
  };

  public static saveAuthToken = (token: string, rememberMe?: boolean): void => {
    if (rememberMe) {
      localStorage.setItem(AUTH_TOKEN_KEY, token);
    } else {
      sessionStorage.setItem(AUTH_TOKEN_KEY, token);
    }
  };

  public static getAuthToken = (): string => {
    return localStorage.getItem(AUTH_TOKEN_KEY) || sessionStorage.getItem(AUTH_TOKEN_KEY);
  };

  public static parseTokenFromResponse = (response: AxiosResponse): string => {
    const token = response?.headers?.[AUTHORIZATION_HEADER];
    return token && token.slice(0, 7) === 'Bearer ' ? token.slice(7, token.length) : null;
  };
}
