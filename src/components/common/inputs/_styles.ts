import {makeStyles} from '@material-ui/core/styles';
import {Theme} from '@material-ui/core';

export const loadingButtonStyles = makeStyles(() => ({
  root: {
    overflow: 'hidden',
  },
  linearLoader: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
  },
}));

export const languageSelectStyles = makeStyles((theme: Theme) => ({
  icon: {
    color: theme.palette.primary.main,
  },
}));
