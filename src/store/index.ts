import {combineReducers} from 'redux';
import authState, {AuthState} from './rerducers/auth.reducer';
import notificationState, {NotificationState} from './rerducers/notification.reducer';
import additionalMenuState, {AdditionalMenuState} from './rerducers/additional-menu.reducer';

export interface RootState {
  readonly authState: AuthState;
  readonly notificationState: NotificationState;
  readonly additionalMenuState: AdditionalMenuState;
}

export default combineReducers<RootState>({
  authState,
  notificationState,
  additionalMenuState,
});
