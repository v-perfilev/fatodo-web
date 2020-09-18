import {makeStyles} from '@material-ui/core/styles';
import {Theme} from '@material-ui/core';
import {COLORS} from '../../../shared/theme';

export const roundPicStyles = makeStyles((theme: Theme) => ({
  root: {
    width: 35,
    height: 35,
    border: 'solid',
    borderWidth: 1,
    borderColor: COLORS.PRIMARY,
    '& img': {
      height: '100%',
    },
  },
  xs: {
    width: 20,
    height: 20,
  },
  md: {
    width: 40,
    height: 40,
  },
  lg: {
    width: 100,
    height: 100,
    borderWidth: 2,
  },
  noBorder: {
    borderWidth: 0,
  },
  whiteBorder: {
    borderColor: COLORS.WHITE,
  },
}));

