import {makeStyles} from '@material-ui/core/styles';
import {Theme} from '@material-ui/core';

export const typeStyles = makeStyles((theme: Theme) => ({
  root: {
    display: 'flex',
    alignItems: 'center',
    '& svg': {
      color: theme.palette.primary.main,
      marginRight: theme.spacing(1),
      fontSize: '1.2rem',
    },
  },
}));
