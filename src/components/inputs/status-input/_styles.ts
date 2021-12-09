import {makeStyles} from '@material-ui/core/styles';
import {COLORS} from '../../../shared/theme/colors';

export const statusInputStyles = makeStyles(() => ({
  root: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: 30,
    height: 30,
  },
  button: {
    width: 30,
    minWidth: 30,
    height: 30,
    padding: 2,

    '& span': {
      margin: 0,
    },
  },
  popupMenu: {
    '& li': {
      display: 'flex',
      alignItems: 'center',
      padding: 6,
    },
  },
  spinner: {
    '& svg': {
      color: COLORS.WHITE,
    },
  },
}));
