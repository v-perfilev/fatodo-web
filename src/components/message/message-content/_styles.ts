import {makeStyles} from '@material-ui/core/styles';
import {Theme} from '@material-ui/core';
import {CHAT_CONTENT_FOOTER_HEIGHT, CHAT_CONTENT_HEADER_HEIGHT} from '../_constants';

export const messageContentStyles = makeStyles(() => ({
  root: {
    position: 'relative',
    display: 'flex',
    flexDirection: 'column',
    flexGrow: 1,
    height: '100%'
  }
}));

export const messageContentPlaceholderStyles = makeStyles(() => ({
  root: {
    display: 'flex',
    flexGrow: 1,
    alignItems: 'center',
    justifyContent: 'center'
  }
}));

export const messageContentLoaderStyles = makeStyles(() => ({
  root: {
    display: 'flex',
    flexGrow: 1,
    alignItems: 'center',
    justifyContent: 'center'
  }
}));

export const messageContentHeaderStyles = makeStyles((theme: Theme) => ({
  root: {
    height: CHAT_CONTENT_HEADER_HEIGHT,
    minHeight: CHAT_CONTENT_HEADER_HEIGHT,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    paddingLeft: theme.spacing(1),
    paddingRight: theme.spacing(1),
    borderBottomWidth: 1,
    borderBottomStyle: 'solid',
    borderBottomColor: theme.palette.grey['300']
  },
  title: {
    flexGrow: 1,
    fontWeight: 'bold'
  }
}));

export const messageContentHeaderActionsStyles = makeStyles((theme: Theme) => ({
  popupMenu: {
    '& .MuiListItem-root': {
      display: 'flex',
      alignItems: 'center'
    },
    '& .MuiSvgIcon-root': {
      color: theme.palette.primary.main,
      marginLeft: theme.spacing(-0.5),
      marginRight: theme.spacing(0.5)
    }
  },
  red: {
    color: theme.palette.error.main,
    '& .MuiSvgIcon-root': {
      color: theme.palette.error.main
    }
  }
}));

export const messageContentListStyles = makeStyles(() => ({
  root: {
    height: 'calc(100vh - ' + CHAT_CONTENT_HEADER_HEIGHT + 'px - ' + CHAT_CONTENT_FOOTER_HEIGHT + 'px)',

    '& .ReactVirtualized__List:focus': {
      outline: 'none'
    }
  }
}));

export const messageContentFooterStyles = makeStyles((theme: Theme) => ({
  root: {
    height: CHAT_CONTENT_FOOTER_HEIGHT,
    minHeight: CHAT_CONTENT_FOOTER_HEIGHT,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    paddingLeft: theme.spacing(1),
    paddingRight: theme.spacing(1),
    borderTopWidth: 1,
    borderTopStyle: 'solid',
    borderTopColor: theme.palette.grey['300']
  }
}));

export const messageContentInputStyles = makeStyles(() => ({
  root: {
    flexGrow: 1
  }
}));

export const messageContentSendButtonStyles = makeStyles((theme: Theme) => ({
  root: {
    marginLeft: theme.spacing(2),
    marginRight: theme.spacing(1),
    flexShrink: 0
  }
}));
