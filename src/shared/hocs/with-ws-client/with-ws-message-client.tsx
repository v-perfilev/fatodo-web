import * as React from 'react';
import {ComponentType, FC, ReactElement, useState} from 'react';
import {WsMessagesContext} from '../../contexts/ws-contexts/ws-messages-context';
import WsClient from '../../../components/common/ws/ws-client';
import {Chat} from '../../../models/chat.model';
import {Message} from '../../../models/message.model';
import {MESSAGE_WS_URL} from '../../../constants';

enum WsMessageDestinations {
  CHAT_NEW = '/user/chat/new',
  CHAT_UPDATE = '/user/chat/update',
  CHAT_DELETE = '/user/chat/delete',
  CHAT_LAST_MESSAGE = '/user/chat/last-message',
  MESSAGE_NEW = '/user/message/new',
  MESSAGE_UPDATE = '/user/message/update',
}

const wsMessageTopics = [
  WsMessageDestinations.CHAT_NEW,
  WsMessageDestinations.CHAT_UPDATE,
  WsMessageDestinations.CHAT_DELETE,
  WsMessageDestinations.CHAT_LAST_MESSAGE,
  WsMessageDestinations.MESSAGE_NEW,
  WsMessageDestinations.MESSAGE_UPDATE
];

const withWsMessageClient = (Component: ComponentType): FC => (props): ReactElement => {
  const [chatNewEvent, setChatNewEvent] = useState<Chat>(null);
  const [chatUpdateEvent, setChatUpdateEvent] = useState<Chat>(null);
  const [chatDeleteEvent, setChatDeleteEvent] = useState<Chat>(null);
  const [chatLastMessageEvent, setChatLastMessageEvent] = useState<Message>(null);
  const [messageNewEvent, setMessageNewEvent] = useState<Message>(null);
  const [messageUpdateEvent, setMessageUpdateEvent] = useState<Message>(null);

  const onMessage = (msg: any, topic: string): void => {
    if (topic === WsMessageDestinations.CHAT_NEW) {
      setChatNewEvent(msg);
    } else if (topic === WsMessageDestinations.CHAT_UPDATE) {
      setChatUpdateEvent(msg);
    } else if (topic === WsMessageDestinations.CHAT_DELETE) {
      setChatDeleteEvent(msg);
    } else if (topic === WsMessageDestinations.CHAT_LAST_MESSAGE) {
      setChatLastMessageEvent(msg);
    } else if (topic === WsMessageDestinations.MESSAGE_NEW) {
      setMessageNewEvent(msg);
    } else if (topic === WsMessageDestinations.MESSAGE_UPDATE) {
      setMessageUpdateEvent(msg);
    }
  };

  const context = {
    chatNewEvent,
    chatUpdateEvent,
    chatDeleteEvent,
    chatLastMessageEvent,
    messageNewEvent,
    messageUpdateEvent
  };

  return (
    <WsMessagesContext.Provider value={context}>
      <Component {...props} />
      <WsClient url={MESSAGE_WS_URL} topics={wsMessageTopics} onMessage={onMessage} />
    </WsMessagesContext.Provider>
  );
};

export default withWsMessageClient;
