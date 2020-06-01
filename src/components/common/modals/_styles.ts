import {makeStyles} from '@material-ui/core/styles';
import {Theme} from '@material-ui/core';

export const modalStyles = makeStyles((theme: Theme) => ({
  header: {
    display: 'flex',
    alignItems: 'center',
    margin: 0,
    padding: theme.spacing(2),
    color: theme.palette.primary.main,
  },
  icon: {
    display: 'flex',
    alignItems: 'center',
    marginRight: theme.spacing(1),
    color: theme.palette.primary.main,
  },
  closeButton: {
    position: 'absolute',
    right: theme.spacing(1),
    top: theme.spacing(1),
    color: theme.palette.primary.main,
  },
}));
