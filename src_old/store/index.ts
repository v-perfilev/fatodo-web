import {combineReducers} from 'redux';
import authState, {AuthState} from './rerducers/auth.reducer';
import snackState, {SnackState} from './rerducers/snack.reducer';

export interface RootState {
  readonly authState: AuthState;
  readonly snackState: SnackState;
}

export default combineReducers<RootState>({
  authState,
  snackState,
});
