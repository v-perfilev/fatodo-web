import {makeStyles} from '@material-ui/core/styles';
import {Theme} from '@material-ui/core';

export const contactMainStyles = makeStyles(() => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    flexGrow: 1,
  },
}));

export const contactHeaderStyles = makeStyles((theme: Theme) => ({
  root: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
  },
  button: {
    marginRight: theme.spacing(1),
    flexShrink: 0,
  },
}));
