import {FAILURE, REQUEST, SUCCESS} from '../thunk.types';
import {ACTION_TYPES} from '../actions/auth.actions';
import User from '../../models/user.model';

const initialState = {
  isAuthenticated: false,
  account: {} as User,
};

export type AuthState = Readonly<typeof initialState>;

export default (state: AuthState = initialState, action): AuthState => {
  switch (action.type) {
    case REQUEST(ACTION_TYPES.LOGIN):
      return {
        ...initialState,
      };
    case SUCCESS(ACTION_TYPES.LOGIN):
      return {
        ...state,
        isAuthenticated: true,
      };
    case FAILURE(ACTION_TYPES.LOGIN):
      return {
        ...initialState,
      };

    case SUCCESS(ACTION_TYPES.ACCOUNT):
      return {
        ...state,
        account: action.payload,
      };
    case FAILURE(ACTION_TYPES.ACCOUNT):
      return {
        ...initialState,
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
