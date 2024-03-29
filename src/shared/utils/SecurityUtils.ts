import {AUTHORIZATION_HEADER, AUTHORIZATION_PREFIX} from '../../constants';
import {AxiosResponse} from 'axios';

const AUTH_TOKEN_KEY = 'token';

export class SecurityUtils {
  public static clearAuthToken = (): void => {
    SecurityUtils.removeFromStorage(localStorage, AUTH_TOKEN_KEY);
    SecurityUtils.removeFromStorage(sessionStorage, AUTH_TOKEN_KEY);
  };

  public static saveAuthToken = async (token: string, rememberMe?: boolean): Promise<void> => {
    if (rememberMe) {
      localStorage.setItem(AUTH_TOKEN_KEY, token);
    } else {
      sessionStorage.setItem(AUTH_TOKEN_KEY, token);
    }
  };

  public static getAuthToken = async (): Promise<string> => {
    return localStorage.getItem(AUTH_TOKEN_KEY) || sessionStorage.getItem(AUTH_TOKEN_KEY);
  };

  public static parseTokenFromResponse = (response: AxiosResponse): string => {
    const token = response?.headers?.[AUTHORIZATION_HEADER];
    const prefixLength = AUTHORIZATION_PREFIX.length;
    return token && token.slice(0, prefixLength) === AUTHORIZATION_PREFIX
      ? token.slice(prefixLength, token.length)
      : '';
  };

  private static removeFromStorage = (storage: Storage, key: string): void => {
    if (storage.getItem(key)) {
      storage.removeItem(key);
    }
  };
}
