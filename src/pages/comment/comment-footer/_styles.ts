import {makeStyles} from '@material-ui/core/styles';
import {Theme} from '@material-ui/core';
import {COMMENTS_FOOTER_HEIGHT} from '../_constants';

export const commentsFooterStyles = makeStyles(() => ({
  root: {
    position: 'fixed',
    left: 0,
    right: 0,
    bottom: 0,
    height: COMMENTS_FOOTER_HEIGHT,
  },
  container: {
    display: 'flex',
    flexDirection: 'row',
  },
}));

export const commentsInputStyles = makeStyles((theme: Theme) => ({
  root: {
    flexGrow: 1,
    '& > div': {
      height: COMMENTS_FOOTER_HEIGHT - theme.spacing(2),
    },
  },
}));

export const commentsSendButtonStyles = makeStyles((theme: Theme) => ({
  root: {
    marginLeft: theme.spacing(2),
    flexShrink: 0,
  },
}));
