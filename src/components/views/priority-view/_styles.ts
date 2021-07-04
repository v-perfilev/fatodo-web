import {makeStyles} from '@material-ui/core/styles';
import {Theme} from '@material-ui/core';

export const priorityStyles = makeStyles((theme: Theme) => ({
  root: {
    display: 'flex',
    alignItems: 'center',
    '& svg': {
      marginRight: theme.spacing(1),
      fontSize: '1.2rem',
      '&.low': {
        color: theme.palette.grey['400'],
      },
      '&.normal': {
        color: theme.palette.primary.main,
      },
      '&.high': {
        color: theme.palette.error.main,
      },
    },
  },
}));
