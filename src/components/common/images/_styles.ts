import {makeStyles} from '@material-ui/core/styles';
import {Theme} from '@material-ui/core';

export const roundPicStyles = makeStyles((theme: Theme) => ({
  root: {
    width: 35,
    height: 35,
    border: 'solid',
    borderWidth: 1,
    borderColor: theme.palette.primary.main,
  },
  small: {
    width: 20,
    height: 20,
  },
  big: {
    width: 100,
    height: 100,
    borderWidth: 3,
  },
}));
