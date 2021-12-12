import {makeStyles} from '@material-ui/core/styles';
import {Theme} from '@material-ui/core';
import {CHAT_CONTROL_HEADER_HEIGHT} from '../_constants';

export const chatControlStyles = makeStyles(() => ({
  root: {
    position: 'relative',
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
    flexGrow: 1,
  },
}));

export const chatControlStubStyles = makeStyles((theme: Theme) => ({
  root: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexGrow: 1,
    marginBottom: CHAT_CONTROL_HEADER_HEIGHT,
    fontSize: '1.5rem',
    color: theme.palette.grey['400'],
  },
}));
