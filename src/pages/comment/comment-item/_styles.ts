import {makeStyles} from '@material-ui/core/styles';
import {Theme} from '@material-ui/core';

export const commentItemStyles = makeStyles((theme: Theme) => ({
  root: {
    paddingBottom: theme.spacing(2),
  },
}));

export const commentItemLoaderStyles = makeStyles(() => ({
  root: {
    display: 'flex',
    justifyContent: 'center',
    flexGrow: 1,
  },
  child: {
    marginLeft: 50,
  },
}));

export const commentItemStubStyles = makeStyles((theme: Theme) => ({
  root: {
    display: 'flex',
    justifyContent: 'center',
    flexGrow: 1,
  },
  notFound: {
    marginTop: theme.spacing(2),
    fontSize: '1rem',
    color: theme.palette.grey['400'],
  },
}));
