import { FAILURE, REQUEST, SUCCESS } from '../thunk.types';
import * as SecurityUtils from '../../utils/security.utils';
import { ACTION_TYPES } from '../actions/auth.actions';

const initialState = {
  loading: false,
  showLoginModal: false,
  account: {} as any,
  errorMessage: null as string,
  redirectMessage: null as string,
};

export type AuthenticationState = Readonly<typeof initialState>;

export default (state: AuthenticationState = initialState, action): AuthenticationState => {
  switch (action.type) {
    case REQUEST(ACTION_TYPES.LOGIN):
      return {
        ...state,
        loading: true,
      };
    case SUCCESS(ACTION_TYPES.LOGIN):
      return {
        ...state,
        loading: false,
        account: action.payload.data,
        showLoginModal: false,
      };
    case FAILURE(ACTION_TYPES.LOGIN):
      SecurityUtils.clearAuthToken();
      return {
        ...initialState,
        loading: false,
        errorMessage: action.payload,
        showLoginModal: true,
      };
    case ACTION_TYPES.TOGGLE_LOGIN_MODAL:
      return {
        ...state,
        showLoginModal: !state.showLoginModal,
      };
    case ACTION_TYPES.LOGOUT:
      return {
        ...initialState,
      };
    case ACTION_TYPES.ERROR_MESSAGE:
      return {
        ...state,
        redirectMessage: action.message,
      };
    case ACTION_TYPES.CLEAR_AUTH:
      return {
        ...initialState,
      };
    default:
      return state;
  }
};
