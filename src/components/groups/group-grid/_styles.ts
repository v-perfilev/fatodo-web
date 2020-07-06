import {makeStyles} from '@material-ui/core/styles';
import {Theme} from '@material-ui/core';

export const groupGridContainerStyles = makeStyles((theme: Theme) => ({
  container: {
    padding: theme.spacing(1),
  },
}));

export const groupGridItemStyles = makeStyles((theme: Theme) => ({
  item: {
    padding: theme.spacing(1),
  },
}));
