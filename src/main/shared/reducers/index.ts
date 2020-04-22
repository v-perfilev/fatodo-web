import { combineReducers } from 'redux';
import authentication, { AuthenticationState } from './authentication/redusers';

export interface IRootState {
  readonly authentication: AuthenticationState;
}

export default combineReducers<IRootState>({
  authentication
});
