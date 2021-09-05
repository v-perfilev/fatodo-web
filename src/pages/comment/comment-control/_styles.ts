import {makeStyles} from '@material-ui/core/styles';
import {Theme} from '@material-ui/core';
import {COMMENTS_CONTROL_HEIGHT, COMMENTS_CONTROL_INPUT_HEIGHT, COMMENTS_CONTROL_REFERENCE_HEIGHT} from '../_constants';

export const commentControlStyles = makeStyles((theme: Theme) => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    height: COMMENTS_CONTROL_HEIGHT,
    marginBottom: theme.spacing(1),
  },
  inputWithButton: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    height: COMMENTS_CONTROL_INPUT_HEIGHT,
  },
  reference: {
    height: COMMENTS_CONTROL_REFERENCE_HEIGHT,
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

export const commentControlReferenceStyles = makeStyles((theme: Theme) => ({
  root: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
  },
  text: {
    fontSize: '0.9em',
    fontWeight: 'bold',
    color: theme.palette.grey['500'],
    marginRight: theme.spacing(0.5),
  },
  icon: {
    // fontSize: '0.9em',
    '& svg': {
      width: '1rem',
      height: '1rem',
      fontSize: '1rem',
    },
  },
}));
