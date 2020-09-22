import {makeStyles} from '@material-ui/core/styles';
import {Theme} from '@material-ui/core';

export const labeledBoxStyles = makeStyles((theme: Theme) => ({
  root: {
    display: 'flex',
    alignItems: 'center',
    '& > *': {
      marginRight: theme.spacing(2),
    },
    '& > *:first-child': {
      marginRight: theme.spacing(1.5),
    },
    '& > *:last-child': {
      marginRight: 0,
    },
  },
  label: {
    fontWeight: 500,
  },
}));
