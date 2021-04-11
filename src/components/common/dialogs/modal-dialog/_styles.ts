import {makeStyles} from '@material-ui/core/styles';
import {Theme} from '@material-ui/core';

export const modalDialogStyles = makeStyles((theme: Theme) => ({
  title: {
    position: 'relative',
    display: 'flex',
    paddingRight: theme.spacing(7),
    color: theme.palette.primary.contrastText,
    background: theme.palette.gradient
  },
  closeIcon: {
    height: '100%',
    position: 'absolute',
    top: 0,
    right: theme.spacing(1),
    display: 'flex',
    alignItems: 'center',
    '& *': {
      color: theme.palette.primary.contrastText
    }
  },
  content: {
    marginTop: theme.spacing(1)
  }
}));
