import {ACTION_TYPES} from '../actions/notification.actions';
import Notification from '../../models/notification.model';
import {SnackbarKey} from 'notistack';

interface ReduxNotification extends Notification {
  key?: SnackbarKey;
  dismissed?: boolean;
}

const initialState = {
  list: [] as ReduxNotification[],
};

export type NotificationState = Readonly<typeof initialState>;

export default (state: NotificationState = initialState, action): NotificationState => {
  switch (action.type) {
    case ACTION_TYPES.ENQUEUE_SNACKBAR:
      return {
        list: [...state.list, action.notification],
      };
    case ACTION_TYPES.CLOSE_SNACKBAR:
      const isDismissAll = (n): boolean => action.key === 'all' || n.key === action.key;
      const handle = (n): ReduxNotification => (isDismissAll(n) ? {...n, dismissed: true} : {...n});
      return {
        list: state.list.map((notification) => handle(notification)),
      };
    case ACTION_TYPES.REMOVE_SNACKBAR:
      const filter = (n): boolean => n.key !== action.key;
      return {
        list: state.list.filter((notification) => filter(notification)),
      };
    default:
      return state;
  }
};
