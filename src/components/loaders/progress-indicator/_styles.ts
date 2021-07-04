import {makeStyles} from '@material-ui/core/styles';

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
