import {makeStyles} from '@material-ui/core/styles';
import {Theme} from '@material-ui/core';

export const authFormStyles = makeStyles((theme: Theme) => ({
  root: {
    width: 350,
    '& > *': {
      marginTop: theme.spacing(1),
      marginBottom: theme.spacing(1),
    },
  },
}));
