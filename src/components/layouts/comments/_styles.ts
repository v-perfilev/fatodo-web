import {makeStyles} from '@material-ui/core/styles';
import {Theme} from '@material-ui/core';
import {COMMENTS_FOOTER_HEIGHT} from './_constants';

export const commentsStyles = makeStyles((theme: Theme) => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    flexGrow: 1
  }
}));

export const commentsInputStyles = makeStyles((theme: Theme) => ({
  root: {
    position: 'fixed',
    left: 0,
    right: 0,
    bottom: 0,
    height: COMMENTS_FOOTER_HEIGHT
  },
  input: {
    flexGrow: 1,
    '& > div': {
      height: COMMENTS_FOOTER_HEIGHT - theme.spacing(2)
    }
  }
}));
