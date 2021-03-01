import {makeStyles} from '@material-ui/core/styles';
import {Theme} from '@material-ui/core';
import {CHAT_CONTENT_HEADER_HEIGHT} from '../_constants';

export const messageContentStyles = makeStyles(() => ({
  root: {
    position: 'relative',
    display: 'flex',
    flexDirection: 'column',
    flexGrow: 1,
    height: '100%'
  }
}));

export const messageContentHeaderStyles = makeStyles((theme: Theme) => ({
  root: {
    height: CHAT_CONTENT_HEADER_HEIGHT,
    minHeight: CHAT_CONTENT_HEADER_HEIGHT,
    display: 'flex',
    flexDirection: 'row',
    flexGrow: 1,
    alignItems: 'center',
    paddingLeft: theme.spacing(1),
    paddingRight: theme.spacing(1),
    borderBottomWidth: 1,
    borderBottomStyle: 'solid',
    borderBottomColor: theme.palette.grey['300']
  }
}));

export const messageContentListStyles = makeStyles(() => ({
  root: {
    height: 'calc(100vh - ' + CHAT_CONTENT_HEADER_HEIGHT + 'px)',
    overflowY: 'auto'
  }
}));
