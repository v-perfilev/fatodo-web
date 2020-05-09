import {combineReducers} from 'redux';
import authState, {AuthState} from './rerducers/auth.reduser';
import notificationState, {NotificationState} from './rerducers/notification.reduser';

export interface RootState {
  readonly authState: AuthState;
  readonly notificationState: NotificationState;
}

export default combineReducers<RootState>({
  authState,
  notificationState,
});
