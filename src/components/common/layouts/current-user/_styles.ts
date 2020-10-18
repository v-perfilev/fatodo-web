import {makeStyles} from '@material-ui/core/styles';
import {Theme} from '@material-ui/core';

export const currentUserStyles = makeStyles((theme: Theme) => ({
  root: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
  },
  image: {
    marginRight: theme.spacing(1),
  },
}));
