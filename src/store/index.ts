import {combineReducers} from 'redux';
import authState, {AuthState} from './rerducers/auth.reducer';
import notificationState, {NotificationState} from './rerducers/notification.reducer';

export interface RootState {
  readonly authState: AuthState;
  readonly notificationState: NotificationState;
}

export default combineReducers<RootState>({
  authState,
  notificationState,
});
