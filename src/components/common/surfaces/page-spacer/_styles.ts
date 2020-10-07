import {makeStyles} from '@material-ui/core/styles';
import {Theme} from '@material-ui/core';

export const pageSpacerStyles = makeStyles((theme: Theme) => ({
  root: {
    height: theme.spacing(2),
  },
}));
