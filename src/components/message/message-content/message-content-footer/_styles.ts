import {makeStyles} from '@material-ui/core/styles';
import {Theme} from '@material-ui/core';
import {CHAT_CONTENT_FOOTER_HEIGHT} from '../../_constants';

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
