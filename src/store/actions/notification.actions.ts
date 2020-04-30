import Notification from '../../model/notification.model';
import {SnackbarKey} from 'notistack';

export const ACTION_TYPES = {
  ENQUEUE_SNACKBAR: 'notificationState/ENQUEUE_SNACKBAR',
  CLOSE_SNACKBAR: 'notificationState/CLOSE_SNACKBAR',
  REMOVE_SNACKBAR: 'notificationState/REMOVE_SNACKBAR',
};

export const enqueueSnackbar = (notification: Notification): any => {
  return {
    type: ACTION_TYPES.ENQUEUE_SNACKBAR,
    notification: {
      ...notification,
      key: notification.options?.key || new Date().getTime() + Math.random(),
    },
  };
};

export const closeSnackbar = (key: SnackbarKey = 'all'): any => ({
  type: ACTION_TYPES.CLOSE_SNACKBAR,
  key,
});

export const removeSnackbar = (key: SnackbarKey): any => {
  return {
    type: ACTION_TYPES.REMOVE_SNACKBAR,
    key,
  };
};
