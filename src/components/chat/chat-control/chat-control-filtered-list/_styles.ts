import {makeStyles} from '@material-ui/core/styles';
import {CHAT_CONTROL_HEADER_HEIGHT} from '../../_constants';

export const chatControlFilteredListStyles = makeStyles(() => ({
  root: {
    height: 'calc(100vh - ' + CHAT_CONTROL_HEADER_HEIGHT + 'px)',
    overflowY: 'auto',
  },
}));
