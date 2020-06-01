import {makeStyles} from '@material-ui/core/styles';

export const centeringStyles = makeStyles(() => ({
  root: {
    display: 'flex',
    flexGrow: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
}));

export const wrapperStyles = makeStyles(() => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    minHeight: '100vh',
  },
}));

export const backgroundStyles = makeStyles(() => ({
  leftBox: {
    overflowY: 'auto',
    height: '100vh',
  },
  container: {
    minHeight: '100vh',
    display: 'flex',
    flexDirection: 'column',
  },
  header: {
    minHeight: 200,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  body: {
    minHeight: 300,
    display: 'flex',
    flexGrow: 1,
    justifyContent: 'center',
    '& > *': {
      maxWidth: '80%',
    },
  },
  bodyCentred: {
    alignItems: 'center',
  },
  footer: {
    minHeight: 200,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  rightBox: {
    overflow: 'hidden',
    height: '100vh',
  },
  img: {
    height: '100%',
  },
}));
