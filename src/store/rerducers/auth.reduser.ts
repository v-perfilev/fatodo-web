import {ACTION_TYPES} from '../actions/auth.actions';
import User from '../../models/user.model';

const initialState = {
  isAuthenticated: false,
  account: {} as User,
};

export type AuthState = Readonly<typeof initialState>;

export default (state: AuthState = initialState, action): AuthState => {
  switch (action.type) {
    case ACTION_TYPES.LOGIN:
      return {
        ...state,
        isAuthenticated: true,
      };
    case ACTION_TYPES.LOGOUT:
      return {
        ...initialState,
      };
    case ACTION_TYPES.ACCOUNT:
      return {
        ...state,
        account: action.account,
      };
    case ACTION_TYPES.CLEAR_AUTH:
      return {
        ...initialState,
      };
    default:
      return state;
  }
};
