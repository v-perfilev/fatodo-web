import {makeStyles} from '@material-ui/core/styles';
import {Theme} from '@material-ui/core';
import {COLORS} from '../../../shared/theme';

export const priorityStyles = makeStyles((theme: Theme) => ({
  root: {

  },
  low: {
    color: COLORS.GREY,
  },
  normal: {
    color: COLORS.BLACK,
  },
  height: {
    color: COLORS.RED,
  }
}));

