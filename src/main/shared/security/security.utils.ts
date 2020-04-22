const AUTH_TOKEN_KEY = 'token';

function removeFromStorage(storage, key) {
  if (storage.get(key)) {
    storage.remove(key);
  }
}

export const clearAuthToken = () => {
  removeFromStorage(localStorage.local, AUTH_TOKEN_KEY);
  removeFromStorage(localStorage.session, AUTH_TOKEN_KEY);
};

export const saveAuthToken = (token, rememberMe) => {
  if (rememberMe) {
    localStorage.set(AUTH_TOKEN_KEY, token);
  } else {
    sessionStorage.set(AUTH_TOKEN_KEY, token);
  }
};

export const getAuthToken = () => localStorage.get(AUTH_TOKEN_KEY) || sessionStorage.get(AUTH_TOKEN_KEY);
