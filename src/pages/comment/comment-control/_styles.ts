import {makeStyles} from '@material-ui/core/styles';
import {Theme} from '@material-ui/core';
import {COMMENTS_CONTROL_HEIGHT} from '../_constants';

export const commentControlStyles = makeStyles(() => ({
  root: {
    display: 'flex',
    flexDirection: 'row',
    height: COMMENTS_CONTROL_HEIGHT,
  },
}));

export const commentControlInputStyles = makeStyles((theme: Theme) => ({
  root: {
    flexGrow: 1,
    '& > div': {
      height: COMMENTS_CONTROL_HEIGHT - theme.spacing(2),
    },
  },
}));

export const commentControlSendButtonStyles = makeStyles((theme: Theme) => ({
  root: {
    marginLeft: theme.spacing(2),
    flexShrink: 0,
  },
}));
