import {makeStyles} from '@material-ui/core/styles';
import {Theme} from '@material-ui/core';

export const userPicStyles = makeStyles((theme: Theme) => ({
  root: {
    width: 35,
    height: 35,
    border: 'solid',
    borderWidth: 1,
    borderColor: theme.palette.primary.main,
  },
}));
