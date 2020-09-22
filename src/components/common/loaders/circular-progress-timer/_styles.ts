import {makeStyles} from '@material-ui/core/styles';

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
