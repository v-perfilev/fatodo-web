import {makeStyles} from '@material-ui/core/styles';
import {Theme} from '@material-ui/core';

export const chatContentStyles = makeStyles(() => ({
  root: {
    position: 'relative',
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
    flexGrow: 1,
  },
}));

export const chatContentPlaceholderStyles = makeStyles((theme: Theme) => ({
  root: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexGrow: 1,
    marginTop: theme.spacing(2),
    marginBottom: theme.spacing(2),
    fontSize: '1.5rem',
    color: theme.palette.grey['400'],
  },
}));

export const chatContentStubStyles = makeStyles((theme: Theme) => ({
  root: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexGrow: 1,
    fontSize: '1.5rem',
    color: theme.palette.grey['400'],
  },
}));
