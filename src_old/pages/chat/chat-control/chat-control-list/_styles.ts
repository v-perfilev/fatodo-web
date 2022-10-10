import {makeStyles} from '@material-ui/core/styles';
import {CHAT_CONTROL_HEADER_HEIGHT} from '../../_constants';

export const chatControlListContainerStyles = makeStyles(() => ({
  root: {
    height: `calc(100% - ${CHAT_CONTROL_HEADER_HEIGHT}px)`,
    overflowY: 'auto',
  },
}));
