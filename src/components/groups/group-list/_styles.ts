import {makeStyles} from '@material-ui/core/styles';
import {Theme} from '@material-ui/core';

export const groupContainerStyles = makeStyles((theme: Theme) => ({
  container: {
    padding: theme.spacing(1),
  },
}));

export const groupItemStyles = makeStyles((theme: Theme) => ({
  item: {
    position: 'relative',
    boxSizing: 'border-box',
    '&:after': {
      content: '""',
      display: 'block',
      paddingBottom: '150%',
    },
    '&.dndMode:after': {
      paddingBottom: '0%',
    },
  },
  innerBox: {
    padding: theme.spacing(1),
    '&.normalMode': {
      position: 'absolute',
      width: '100%',
      height: '100%',
    }
  },
}));
