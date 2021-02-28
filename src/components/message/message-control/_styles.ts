import {makeStyles} from '@material-ui/core/styles';
import {Theme} from '@material-ui/core';
import {CHAT_FILTER_HEADER_HEIGHT} from '../_constants';

export const messageControlStyles = makeStyles(() => ({
  root: {
    position: 'relative',
    display: 'flex',
    flexDirection: 'column',
    flexGrow: 1,
    height: '100%'
  }
}));

export const messageControlHeaderStyles = makeStyles((theme: Theme) => ({
  root: {
    height: CHAT_FILTER_HEADER_HEIGHT,
    minHeight: CHAT_FILTER_HEADER_HEIGHT,
    display: 'flex',
    flexDirection: 'row',
    flexGrow: 1,
    alignItems: 'center',
    paddingLeft: 15,
    paddingRight: 15,
    borderBottomWidth: 1,
    borderBottomStyle: 'solid',
    borderBottomColor: theme.palette.grey['300']
  },
  input: {
    width: '100%'
  }
}));

export const messageControlListStyles = makeStyles(() => ({
  root: {
    height: 'calc(100vh - ' + CHAT_FILTER_HEADER_HEIGHT + 'px)',
    overflowY: 'auto'
  }
}));

export const messageControlFilteredListStyles = makeStyles(() => ({
  root: {
    height: 'calc(100vh - ' + CHAT_FILTER_HEADER_HEIGHT + 'px)',
    overflowY: 'auto'
  }
}));

export const messageControlChatButtonStyles = makeStyles((theme: Theme) => ({
  root: {
    marginLeft: theme.spacing(2),
    flexShrink: 0
  }
}));

