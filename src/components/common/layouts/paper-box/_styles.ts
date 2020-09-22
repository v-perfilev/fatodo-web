import {makeStyles} from '@material-ui/core/styles';
import {Theme} from '@material-ui/core';

export const paperBoxStyles = makeStyles((theme: Theme) => ({
  root: {
    paddingTop: theme.spacing(0.5),
    paddingBottom: theme.spacing(0.5),
    paddingLeft: theme.spacing(1),
    paddingRight: theme.spacing(1),
  },
}));
