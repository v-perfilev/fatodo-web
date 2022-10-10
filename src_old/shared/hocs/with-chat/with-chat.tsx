import withWsChat from './with-ws-chat';
import withUnreadMessages from './with-unread-messages';
import {flowRight} from 'lodash';

export default flowRight([withWsChat, withUnreadMessages]);
