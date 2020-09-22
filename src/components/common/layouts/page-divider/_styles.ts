import {makeStyles} from '@material-ui/core/styles';
import {Theme} from '@material-ui/core';

export const pageDividerStyles = makeStyles((theme: Theme) => ({
  root: {
    width: '100%',
    height: 1,
    marginTop: theme.spacing(0.5),
    marginBottom: theme.spacing(0.5),
    background: theme.palette.gradient,
  },
}));
