import {makeStyles} from '@material-ui/core/styles';
import {Theme} from '@material-ui/core';
import {COMMENTS_CHILD_MARGIN} from '../_constants';

export const commentItemStyles = makeStyles((theme: Theme) => ({
  root: {
    paddingBottom: theme.spacing(2),
  },
}));

export const commentItemButtonStyles = makeStyles((theme: Theme) => ({
  root: {
    display: 'flex',
    justifyContent: 'center',
    flexGrow: 1,
  },
  child: {
    marginLeft: COMMENTS_CHILD_MARGIN,
  },
  button: {
    marginTop: theme.spacing(2),
    fontSize: '1rem',
    color: theme.palette.grey['400'],
  },
}));

export const commentItemLoaderStyles = makeStyles(() => ({
  root: {
    display: 'flex',
    justifyContent: 'center',
    flexGrow: 1,
  },
  child: {
    marginLeft: COMMENTS_CHILD_MARGIN,
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
