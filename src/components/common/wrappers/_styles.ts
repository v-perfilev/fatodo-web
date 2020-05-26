import {makeStyles} from '@material-ui/core/styles';

export const appWrapperStyles = makeStyles(() => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    minHeight: '100vh',
  },
}));

export const contentWrapperStyles = makeStyles(() => ({
  root: {
    display: 'flex',
    flexGrow: 1,
  },
}));
