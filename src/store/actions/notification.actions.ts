import Notification from '../../models/notification.model';
import {SnackbarKey} from 'notistack';

export const ACTION_TYPES = {
  ENQUEUE_SNACKBAR: 'notificationState/ENQUEUE_SNACKBAR',
  CLOSE_SNACKBAR: 'notificationState/CLOSE_SNACKBAR',
  REMOVE_SNACKBAR: 'notificationState/REMOVE_SNACKBAR',
};

export const enqueueSnackbar = (notification: Notification) => (dispatch): void =>
  dispatch({
    type: ACTION_TYPES.ENQUEUE_SNACKBAR,
    notification: {
      ...notification,
      key: notification.options?.key || new Date().getTime() + Math.random(),
    },
  });

export const closeSnackbar = (key: SnackbarKey = 'all') => (dispatch): void =>
  dispatch({
    type: ACTION_TYPES.CLOSE_SNACKBAR,
    key,
  });

export const removeSnackbar = (key: SnackbarKey) => (dispatch): void =>
  dispatch({
    type: ACTION_TYPES.REMOVE_SNACKBAR,
    key,
  });
