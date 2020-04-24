import { combineReducers } from 'redux';
import authentication, { AuthenticationState } from './rerducers/auth-reduser';

export interface IRootState {
  readonly authentication: AuthenticationState;
}

export default combineReducers<IRootState>({
  authentication,
});
