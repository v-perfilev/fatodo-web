import {makeStyles} from '@material-ui/core/styles';
import {Theme} from '@material-ui/core';

export const labeledBoxStyles = makeStyles((theme: Theme) => ({
  root: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
  },
  text: {
    marginLeft: theme.spacing(1),
  },
}));
