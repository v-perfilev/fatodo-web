import {makeStyles} from '@material-ui/core/styles';
import {Theme} from '@material-ui/core';
import {CHAT_FILTER_HEADER_HEIGHT} from '../_constants';

export const messageChatListStyles = makeStyles((theme: Theme) => ({
  root: {
    height: 'calc(100vh - ' + CHAT_FILTER_HEADER_HEIGHT + 'px)',
    overflowY: 'auto'
  }
}));
