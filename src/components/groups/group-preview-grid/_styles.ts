import {makeStyles} from '@material-ui/core/styles';
import {Theme} from '@material-ui/core';

export const groupPreviewGridContainerStyles = makeStyles((theme: Theme) => ({
  container: {
    position: 'relative',
    margin: theme.spacing(1),
  },
}));

export const groupPreviewGridItemStyles = makeStyles((theme: Theme) => ({
  item: {
    position: 'absolute',
    width: '100%',
    padding: theme.spacing(1),
    userSelect: 'none',
  },
}));
