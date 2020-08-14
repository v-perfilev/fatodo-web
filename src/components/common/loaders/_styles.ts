import {makeStyles} from '@material-ui/core/styles';

export const spinnerStyles = makeStyles(() => ({
  root: {
    position: 'relative',
    display: 'flex',
  },
  image: {
    width: 270,
    height: 270,
    maxWidth: '70%',
    position: 'fixed',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
  },
}));

export const progressIndicatorStyles = makeStyles(() => ({
  transparent: {
    opacity: 0,
  },
  hide: {
    display: 'none !important',
  },
  center: {
    display: 'flex',
    justifyContent: 'center',
  },
}));

export const circularProgressTimerStyles = makeStyles(() => ({
  root: {
    position: 'relative',
    display: 'inline-flex',
  },
  textBox: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
}));
