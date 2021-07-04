import {makeStyles} from '@material-ui/core/styles';
import {Theme} from '@material-ui/core';

export const pageHeaderStyles = makeStyles((theme: Theme) => ({
  root: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    color: theme.palette.primary.main,
    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(1),
    '& > *': {
      marginRight: theme.spacing(1.5),
    },
  },
}));
