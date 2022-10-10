import {makeStyles} from '@material-ui/core/styles';
import {Theme} from '@material-ui/core';

export const commentListContainerStyles = makeStyles(() => ({
  root: {
    position: 'relative',
  },
}));

export const commentListLoadButtonStyles = makeStyles((theme: Theme) => ({
  root: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: theme.spacing(2),
    marginBottom: theme.spacing(2),
  },
}));

export const commentListStubStyles = makeStyles((theme: Theme) => ({
  root: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: theme.spacing(2),
    marginBottom: theme.spacing(2),
    fontSize: '1.3rem',
    color: theme.palette.grey['400'],
  },
}));
