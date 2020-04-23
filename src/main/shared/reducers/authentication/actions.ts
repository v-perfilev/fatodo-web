import { AxiosResponse } from 'axios';
import { ACTION_TYPES } from './types';

export function toggleLoginModalAction() {
  return {
    type: ACTION_TYPES.TOGGLE_LOGIN_MODAL
  }
}

export function loginAction(response: AxiosResponse) {
  return {
    type: ACTION_TYPES.LOGIN,
    payload: response
  }
}

export function logoutAction() {
  return {
    type: ACTION_TYPES.LOGOUT
  };
}

export function errorMessageAction(message: string) {
  return {
    type: ACTION_TYPES.ERROR_MESSAGE,
    message
  };
}

export function clearAuthAction() {
  return {
    type: ACTION_TYPES.CLEAR_AUTH
  };
}
