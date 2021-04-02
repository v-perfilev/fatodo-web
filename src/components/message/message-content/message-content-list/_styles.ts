import {makeStyles} from '@material-ui/core/styles';
import {CHAT_CONTENT_FOOTER_HEIGHT, CHAT_CONTENT_HEADER_HEIGHT} from '../../_constants';
import {Theme} from '@material-ui/core';

export const messageContentListStyles = makeStyles(() => ({
  root: {
    position: 'relative',
    height: 'calc(100vh - ' + CHAT_CONTENT_HEADER_HEIGHT + 'px - ' + CHAT_CONTENT_FOOTER_HEIGHT + 'px)',

    '& .ReactVirtualized__List:focus': {
      outline: 'none',
    },
  },
}));

export const messageContentScrollButtonStyles = makeStyles((theme: Theme) => ({
  root: {
    position: 'absolute',
    right: theme.spacing(2),
    bottom: theme.spacing(2),
  },
}));
