import {combineReducers} from 'redux';
import authState, {AuthenticationState} from './rerducers/auth.reduser';
import notificationState, {NotificationState} from './rerducers/notification.reduser';

export interface RootState {
  readonly authState: AuthenticationState;
  readonly notificationState: NotificationState;
}

export default combineReducers<RootState>({
  authState,
  notificationState,
});
