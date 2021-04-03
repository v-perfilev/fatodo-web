import * as React from 'react';
import {ComponentType, FC, PropsWithChildren, ReactElement, useState} from 'react';
import {WsChatContext} from '../../contexts/chat-contexts/ws-chat-context';
import WsClient from '../../../components/common/ws/ws-client';
import {Chat} from '../../../models/chat.model';
import {Message, MessageReactions, MessageStatuses} from '../../../models/message.model';
import {WS_URL} from '../../../constants';
import {compose} from 'recompose';
import withAuthState from '../with-auth-state';
import {AuthState} from '../../../store/rerducers/auth.reducer';

enum WsChatDestinations {
  CHAT_NEW = '/user/chat/new',
  CHAT_UPDATE = '/user/chat/update',
  CHAT_LAST_MESSAGE = '/user/chat/last-message',
  CHAT_LAST_MESSAGE_UPDATE = '/user/chat/last-message-update',
  MESSAGE_NEW = '/user/message/new',
  MESSAGE_UPDATE = '/user/message/update',
  MESSAGE_STATUS = '/user/message/status',
  MESSAGE_REACTION = '/user/message/reaction',
}

const wsMessageTopics = [
  WsChatDestinations.CHAT_NEW,
  WsChatDestinations.CHAT_UPDATE,
  WsChatDestinations.CHAT_LAST_MESSAGE,
  WsChatDestinations.MESSAGE_NEW,
  WsChatDestinations.MESSAGE_UPDATE,
  WsChatDestinations.MESSAGE_STATUS,
  WsChatDestinations.MESSAGE_REACTION,
];

type Props = PropsWithChildren<AuthState>;

const withWsChatClient = (Component: ComponentType): FC => (props: Props): ReactElement => {
  const {isAuthenticated} = props;
  const [chatNewEvent, setChatNewEvent] = useState<Chat>(null);
  const [chatUpdateEvent, setChatUpdateEvent] = useState<Chat>(null);
  const [chatLastMessageEvent, setChatLastMessageEvent] = useState<Chat>(null);
  const [chatLastMessageUpdateEvent, setChatLastMessageUpdateEvent] = useState<Chat>(null);
  const [messageNewEvent, setMessageNewEvent] = useState<Message>(null);
  const [messageUpdateEvent, setMessageUpdateEvent] = useState<Message>(null);
  const [messageStatusesEvent, setMessageStatusesEvent] = useState<MessageStatuses>(null);
  const [messageReactionsEvent, setMessageReactionsEvent] = useState<MessageReactions>(null);

  const onMessage = (msg: any, topic: string): void => {
    if (topic === WsChatDestinations.CHAT_NEW) {
      setChatNewEvent(msg);
    } else if (topic === WsChatDestinations.CHAT_UPDATE) {
      setChatUpdateEvent(msg);
    } else if (topic === WsChatDestinations.CHAT_LAST_MESSAGE) {
      setChatLastMessageEvent(msg);
    } else if (topic === WsChatDestinations.CHAT_LAST_MESSAGE_UPDATE) {
      setChatLastMessageUpdateEvent(msg);
    } else if (topic === WsChatDestinations.MESSAGE_NEW) {
      setMessageNewEvent(msg);
    } else if (topic === WsChatDestinations.MESSAGE_UPDATE) {
      setMessageUpdateEvent(msg);
    } else if (topic === WsChatDestinations.MESSAGE_STATUS) {
      setMessageStatusesEvent(msg);
    } else if (topic === WsChatDestinations.MESSAGE_REACTION) {
      setMessageReactionsEvent(msg);
    }
  };

  const context = {
    chatNewEvent,
    chatUpdateEvent,
    chatLastMessageEvent,
    chatLastMessageUpdateEvent,
    messageNewEvent,
    messageUpdateEvent,
    messageStatusesEvent,
    messageReactionsEvent,
  };

  return (
    <WsChatContext.Provider value={context}>
      <Component {...props} />
      {isAuthenticated && <WsClient url={WS_URL} topics={wsMessageTopics} onMessage={onMessage} />}
    </WsChatContext.Provider>
  );
};

export default compose(withAuthState, withWsChatClient);
