import { combineReducers } from 'redux';
import authState, { AuthenticationState } from './rerducers/auth.reduser';
import notificationState, { NotificationState } from './rerducers/notification.reduser';

export interface IRootState {
  readonly authState: AuthenticationState;
  readonly notificationState: NotificationState;
}

export default combineReducers<IRootState>({
  authState,
  notificationState,
});
