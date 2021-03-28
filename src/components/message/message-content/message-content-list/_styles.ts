import {makeStyles} from '@material-ui/core/styles';
import {CHAT_CONTENT_FOOTER_HEIGHT, CHAT_CONTENT_HEADER_HEIGHT} from '../../_constants';

export const messageContentListStyles = makeStyles(() => ({
  root: {
    height: 'calc(100vh - ' + CHAT_CONTENT_HEADER_HEIGHT + 'px - ' + CHAT_CONTENT_FOOTER_HEIGHT + 'px)',

    '& .ReactVirtualized__List:focus': {
      outline: 'none',
    },
  },
}));
