const AUTH_TOKEN_KEY = 'token';

function removeFromStorage(storage, key) {
  if (storage.getItem(key)) {
    storage.removeItem(key);
  }
}

export const clearAuthToken = () => {
  removeFromStorage(localStorage, AUTH_TOKEN_KEY);
  removeFromStorage(sessionStorage, AUTH_TOKEN_KEY);
};

export const saveAuthToken = (token, rememberMe) => {
  if (rememberMe) {
    localStorage.setItem(AUTH_TOKEN_KEY, token);
  } else {
    sessionStorage.setItem(AUTH_TOKEN_KEY, token);
  }
};

export const getAuthToken = () => localStorage.getItem(AUTH_TOKEN_KEY) || sessionStorage.getItem(AUTH_TOKEN_KEY);

export const parseToken = t => (t && t.slice(0, 7) === 'Bearer ' ? t.slice(7, t.length) : null);
