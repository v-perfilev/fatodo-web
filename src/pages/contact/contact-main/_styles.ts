import {makeStyles} from '@material-ui/core/styles';
import {Theme} from '@material-ui/core';

export const contactMainStyles = makeStyles((theme: Theme) => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    flexGrow: 1,
  },
  control: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
  },
  button: {
    marginRight: theme.spacing(1),
    flexShrink: 0,
  },
}));

export const contactFilterStyles = makeStyles(() => ({
  root: {
    display: 'flex',
    width: 400,
  },
}));
