import {compose} from 'recompose';
import withWsMessageClient from './with-ws-chat-client';
import withUnreadMessages from './with-unread-messages';

export default compose(withWsMessageClient, withUnreadMessages);
