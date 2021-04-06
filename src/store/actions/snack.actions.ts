import Snack from '../../models/snack.model';
import {SnackbarKey} from 'notistack';

export const ACTION_TYPES = {
  ENQUEUE_SNACKBAR: 'snackState/ENQUEUE_SNACKBAR',
  CLOSE_SNACKBAR: 'snackState/CLOSE_SNACKBAR',
  REMOVE_SNACKBAR: 'snackState/REMOVE_SNACKBAR'
};

export const enqueueReduxSnack = (snack: Snack) => (dispatch): void =>
  dispatch({
    type: ACTION_TYPES.ENQUEUE_SNACKBAR,
    snack: {
      ...snack,
      key: snack.options?.key || new Date().getTime() + Math.random()
    }
  });

export const closeReduxSnack = (key: SnackbarKey = 'all') => (dispatch): void =>
  dispatch({
    type: ACTION_TYPES.CLOSE_SNACKBAR,
    key
  });

export const removeReduxSnack = (key: SnackbarKey) => (dispatch): void =>
  dispatch({
    type: ACTION_TYPES.REMOVE_SNACKBAR,
    key
  });
