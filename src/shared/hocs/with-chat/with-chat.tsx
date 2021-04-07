import {compose} from 'recompose';
import withWsMessageClient from './with-ws-chat-client';
import withUnreadMessages from './with-unread-messages';
import {memo} from 'react';

export default compose(withWsMessageClient, withUnreadMessages, memo);
