import {makeStyles} from '@material-ui/core/styles';

export const activeButtonStyles = makeStyles(() => ({
  root: {
    overflow: 'hidden',
  },
  linearLoader: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
  },
}));
