import Snack from '../../models/snack.model';
import {SnackbarKey} from 'notistack';
import {ACTION_TYPES} from '../actions/snack.actions';

export interface ReduxSnack extends Snack {
  key?: SnackbarKey;
  dismissed?: boolean;
}

const initialState = {
  list: [] as ReduxSnack[],
};

export type SnackState = Readonly<typeof initialState>;

export default (state: SnackState = initialState, action): SnackState => {
  switch (action.type) {
    case ACTION_TYPES.ENQUEUE_SNACKBAR:
      return {
        list: [...state.list, action.snack],
      };
    case ACTION_TYPES.CLOSE_SNACKBAR:
      const isDismissAll = (n): boolean => action.key === 'all' || n.key === action.key;
      const handle = (n): ReduxSnack => (isDismissAll(n) ? {...n, dismissed: true} : {...n});
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
