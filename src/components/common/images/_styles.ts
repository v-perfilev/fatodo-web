import {makeStyles} from '@material-ui/core/styles';
import {Theme} from '@material-ui/core';

export const roundPicStyles = makeStyles((theme: Theme) => ({
  root: {
    borderStyle: 'solid',
    borderColor: theme.palette.primary.main,
    '& img': {
      height: '100%',
    },
  },
  xs: {
    width: 20,
    height: 20,
  },
  sm: {
    width: 35,
    height: 35,
  },
  md: {
    width: 40,
    height: 40,
  },
  lg: {
    width: 100,
    height: 100,
  },
}));

