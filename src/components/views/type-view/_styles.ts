import {makeStyles} from '@material-ui/core/styles';
import {Theme} from '@material-ui/core';

export const typeStyles = makeStyles((theme: Theme) => ({
  root: {
    display: 'flex',
    alignItems: 'center',
    marginRight: theme.spacing(1),
    '& svg': {
      color: theme.palette.primary.main,
      fontSize: '1.2rem',
    },
  },
  tooltip: {
    display: 'flex',
  },
}));
