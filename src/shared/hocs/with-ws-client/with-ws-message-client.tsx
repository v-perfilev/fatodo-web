import * as React from 'react';
import {ComponentType, FC, ReactElement, useState} from 'react';
import {WsMessagesContext} from '../../contexts/ws-contexts/ws-messages-context';
import WsClient from '../../../components/common/ws/ws-client';
import {CHAT_MESSAGE_TOPIC, CHAT_ROOT_TOPIC, MESSAGE_WS_URL} from '../../../constants';
import {Chat} from '../../../models/chat.model';
import {Message} from '../../../models/message.model';

const withWsMessageClient = (Component: ComponentType): FC => (props): ReactElement => {
  const [chatEvent, setChatEvent] = useState<Chat>(null);
  const [messageEvent, setMessageEvent] = useState<Message>(null);

  const handleChatEvent = (chat: Chat): void => {
    setChatEvent(chat);
  };

  const handleMessageEvent = (message: Message): void => {
    setMessageEvent(message);
  };

  const onMessage = (msg: any, topic: string): void => {
    if (topic === CHAT_ROOT_TOPIC) {
      handleChatEvent(msg);
    } else if (topic === CHAT_MESSAGE_TOPIC) {
      handleMessageEvent(msg);
    }
  };

  const context = {chatEvent, messageEvent};

  return (
    <WsMessagesContext.Provider value={context}>
      <Component {...props} />
      <WsClient url={MESSAGE_WS_URL} topics={[CHAT_ROOT_TOPIC, CHAT_MESSAGE_TOPIC]} onMessage={onMessage} />
    </WsMessagesContext.Provider>
  );
};

export default withWsMessageClient;
