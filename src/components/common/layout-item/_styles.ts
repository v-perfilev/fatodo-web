import {makeStyles} from '@material-ui/core/styles';
import {Theme} from '@material-ui/core';
import {COLORS} from '../../../shared/theme';

export const priorityStyles = makeStyles((theme: Theme) => ({
  root: {
    display: 'flex',
    alignItems: 'center',
    '& svg': {
      marginRight: theme.spacing(1),
      fontSize: '1.2rem',
      '&.low': {
        color: COLORS.GREY,
      },
      '&.normal': {
        color: COLORS.PRIMARY,
      },
      '&.high': {
        color: COLORS.RED,
      },
    },
  },
}));

export const typeStyles = makeStyles((theme: Theme) => ({
  root: {
    display: 'flex',
    alignItems: 'center',
    '& svg': {
      color: COLORS.PRIMARY,
      marginRight: theme.spacing(1),
      fontSize: '1.2rem',
    },
  },
}));
