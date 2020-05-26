import {makeStyles} from '@material-ui/core/styles';

export const spinnerStyles = makeStyles(() => ({
  root: {
    width: 270,
    height: 270,
    maxWidth: '70%',
    position: 'fixed',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    zIndex: 1000,
  },
}));
