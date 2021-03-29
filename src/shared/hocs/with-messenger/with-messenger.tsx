import {compose} from 'recompose';
import withWsMessageClient from './with-ws-messages-client';
import withUnreadMessages from './with-unread-messages';

export default compose(withWsMessageClient, withUnreadMessages);
