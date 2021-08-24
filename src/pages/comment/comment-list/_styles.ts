import {makeStyles} from '@material-ui/core/styles';
import {Theme} from '@material-ui/core';

export const commentContainerStyles = makeStyles(() => ({
  root: {
    position: 'relative'
  }
}));

export const commentRendererStyles = makeStyles(() => ({
  root: {
    overflow: 'hidden'
  }
}));

export const commentStubStyles = makeStyles((theme: Theme) => ({
  root: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: theme.spacing(2),
    marginBottom: theme.spacing(2),
    fontSize: '1rem',
    color: theme.palette.grey['400']
  }
}));
