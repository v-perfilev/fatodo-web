import {makeStyles} from '@material-ui/core/styles';
import {Theme} from '@material-ui/core';
import {CHAT_CONTENT_FOOTER_HEIGHT} from '../../_constants';

export const chatContentFooterStyles = makeStyles((theme: Theme) => ({
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
    borderTopColor: theme.palette.grey['300'],
  },
}));

export const chatContentInputStyles = makeStyles((theme: Theme) => ({
  root: {
    flexGrow: 1,
    '& > div': {
      // padding: theme.spacing(2)
      height: CHAT_CONTENT_FOOTER_HEIGHT - theme.spacing(2),
    },
  },
}));

export const chatContentSendButtonStyles = makeStyles((theme: Theme) => ({
  root: {
    marginLeft: theme.spacing(2),
    marginRight: theme.spacing(1),
    flexShrink: 0,
  },
}));
