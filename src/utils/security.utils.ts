const AUTH_TOKEN_KEY = 'token';

function removeFromStorage(storage, key): void {
  if (storage.getItem(key)) {
    storage.removeItem(key);
  }
}

export const clearAuthToken = (): void => {
  removeFromStorage(localStorage, AUTH_TOKEN_KEY);
  removeFromStorage(sessionStorage, AUTH_TOKEN_KEY);
};

export const saveAuthToken = (token, rememberMe): void => {
  if (rememberMe) {
    localStorage.setItem(AUTH_TOKEN_KEY, token);
  } else {
    sessionStorage.setItem(AUTH_TOKEN_KEY, token);
  }
};

export const getAuthToken = (): string => {
  return localStorage.getItem(AUTH_TOKEN_KEY) || sessionStorage.getItem(AUTH_TOKEN_KEY);
};

export const parseTokenFromAuthResponse = (response): string => {
  const token = response?.value?.headers?.authorization;
  return token && token.slice(0, 7) === 'Bearer ' ? token.slice(7, token.length) : null;
};
