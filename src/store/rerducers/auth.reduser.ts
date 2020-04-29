import { FAILURE, REQUEST, SUCCESS } from '../thunk.types';
import * as SecurityUtils from '../../utils/security.utils';
import { ACTION_TYPES } from '../actions/auth.actions';
import User from '../../model/user.model';

const initialState = {
  loading: false,
  showLoginModal: false,
  isAuthenticated: false,
  account: {} as User,
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
        showLoginModal: false,
        isAuthenticated: true,
      };
    case FAILURE(ACTION_TYPES.LOGIN):
      return {
        ...initialState,
        loading: false,
        showLoginModal: true,
      };

    case SUCCESS(ACTION_TYPES.ACCOUNT):
      return {
        ...state,
        account: action.payload.data,
      };
    case FAILURE(ACTION_TYPES.ACCOUNT):
      return {
        ...initialState,
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
    case ACTION_TYPES.CLEAR_AUTH:
      return {
        ...initialState,
      };
    default:
      return state;
  }
};
