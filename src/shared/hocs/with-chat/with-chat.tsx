import withWsChatClient from './with-ws-chat-client';
import withUnreadMessages from './with-unread-messages';
import {memo} from 'react';
import {flowRight} from 'lodash';

export default flowRight([withWsChatClient, withUnreadMessages, memo]);
