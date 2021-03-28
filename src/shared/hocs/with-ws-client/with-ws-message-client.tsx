import * as React from 'react';
import {ComponentType, FC, PropsWithChildren, ReactElement, useState} from 'react';
import {WsMessagesContext} from '../../contexts/ws-contexts/ws-messages-context';
import WsClient from '../../../components/common/ws/ws-client';
import {Chat} from '../../../models/chat.model';
import {Message, MessageReactions, MessageStatuses} from '../../../models/message.model';
import {MESSAGE_WS_URL} from '../../../constants';
import {compose} from 'recompose';
import withAuthState from '../with-auth-state';
import {AuthState} from '../../../store/rerducers/auth.reducer';

enum WsMessageDestinations {
  CHAT_NEW = '/user/chat/new',
  CHAT_UPDATE = '/user/chat/update',
  CHAT_LAST_MESSAGE = '/user/chat/last-message',
  MESSAGE_NEW = '/user/message/new',
  MESSAGE_UPDATE = '/user/message/update',
  MESSAGE_STATUS = '/user/message/status',
  MESSAGE_REACTION = '/user/message/reaction',
}

const wsMessageTopics = [
  WsMessageDestinations.CHAT_NEW,
  WsMessageDestinations.CHAT_UPDATE,
  WsMessageDestinations.CHAT_LAST_MESSAGE,
  WsMessageDestinations.MESSAGE_NEW,
  WsMessageDestinations.MESSAGE_UPDATE,
  WsMessageDestinations.MESSAGE_STATUS,
  WsMessageDestinations.MESSAGE_REACTION,
];

type Props = AuthState & PropsWithChildren<any>;

const withWsMessageClient = (Component: ComponentType): FC => (props: Props): ReactElement => {
  const {isAuthenticated} = props;
  const [chatNewEvent, setChatNewEvent] = useState<Chat>(null);
  const [chatUpdateEvent, setChatUpdateEvent] = useState<Chat>(null);
  const [chatLastMessageEvent, setChatLastMessageEvent] = useState<Chat>(null);
  const [messageNewEvent, setMessageNewEvent] = useState<Message>(null);
  const [messageUpdateEvent, setMessageUpdateEvent] = useState<Message>(null);
  const [messageStatusesEvent, setMessageStatusesEvent] = useState<MessageStatuses>(null);
  const [messageReactionsEvent, setMessageReactionsEvent] = useState<MessageReactions>(null);

  const onMessage = (msg: any, topic: string): void => {
    if (topic === WsMessageDestinations.CHAT_NEW) {
      setChatNewEvent(msg);
    } else if (topic === WsMessageDestinations.CHAT_UPDATE) {
      setChatUpdateEvent(msg);
    } else if (topic === WsMessageDestinations.CHAT_LAST_MESSAGE) {
      setChatLastMessageEvent(msg);
    } else if (topic === WsMessageDestinations.MESSAGE_NEW) {
      setMessageNewEvent(msg);
    } else if (topic === WsMessageDestinations.MESSAGE_UPDATE) {
      setMessageUpdateEvent(msg);
    } else if (topic === WsMessageDestinations.MESSAGE_STATUS) {
      setMessageStatusesEvent(msg);
    } else if (topic === WsMessageDestinations.MESSAGE_REACTION) {
      setMessageReactionsEvent(msg);
    }
  };

  const context = {
    chatNewEvent,
    chatUpdateEvent,
    chatLastMessageEvent,
    messageNewEvent,
    messageUpdateEvent,
    messageStatusesEvent,
    messageReactionsEvent,
  };

  return (
    <WsMessagesContext.Provider value={context}>
      <Component {...props} />
      {isAuthenticated && <WsClient url={MESSAGE_WS_URL} topics={wsMessageTopics} onMessage={onMessage} />}
    </WsMessagesContext.Provider>
  );
};

export default compose(withAuthState, withWsMessageClient);
