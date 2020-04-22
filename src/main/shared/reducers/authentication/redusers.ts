import { FAILURE, REQUEST, SUCCESS } from '../thunk-types';
import * as SecurityUtils from '../../security/security.utils';
import { ACTION_TYPES } from './types';

const initialState = {
  loading: false,
  showModalLogin: false,
  account: {} as any,
  errorMessage: null as string,
  redirectMessage: null as string
};

export type AuthenticationState = Readonly<typeof initialState>;

export default (state: AuthenticationState = initialState, action): AuthenticationState => {
  switch (action.type) {
    case REQUEST(ACTION_TYPES.LOGIN):
      return {
        ...state,
        loading: true
      };
    case SUCCESS(ACTION_TYPES.LOGIN):
      return {
        ...state,
        loading: false,
        account: action.payload.data,
        showModalLogin: false
      };
    case FAILURE(ACTION_TYPES.LOGIN):
      SecurityUtils.clearAuthToken();
      return {
        ...initialState,
        loading: false,
        errorMessage: action.payload,
        showModalLogin: true
      };
    case ACTION_TYPES.MODAL_SHOW:
      return {
        ...state,
        showModalLogin: true
      };
    case ACTION_TYPES.MODAL_HIDE:
      return {
        ...state,
        showModalLogin: false
      };
    case ACTION_TYPES.LOGOUT:
      return {
        ...initialState
      };
    case ACTION_TYPES.ERROR_MESSAGE:
      return {
        ...initialState,
        redirectMessage: action.message
      };
    case ACTION_TYPES.CLEAR_AUTH:
      return {
        ...initialState
      };
    default:
      return state;
  }
};
