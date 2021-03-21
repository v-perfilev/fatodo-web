import * as React from 'react';
import {ComponentType, FC, ReactElement, useState} from 'react';
import {WsMessagesContext} from '../../contexts/ws-contexts/ws-messages-context';
import WsClient from '../../../components/common/ws/ws-client';
import {CHAT_MESSAGE_TOPIC, CHAT_ROOT_TOPIC, MESSAGE_WS_URL} from '../../../constants';
import {Chat} from '../../../models/chat.model';
import {Message} from '../../../models/message.model';

const withWsMessageClient = (Component: ComponentType): FC => (props): ReactElement => {
  const [chats, setChats] = useState<Chat[]>([]);
  const [messages, setMessages] = useState<Message[]>([]);

  const handleChatEvent = (chat: Chat): void => {
    setChats(prevState => [...prevState, chat]);
  };

  const handleMessageEvent = (message: Message): void => {
    setMessages(prevState => [...prevState, message]);
  };

  const onMessage = (msg: any, topic: string): void => {
    if (topic === CHAT_ROOT_TOPIC) {
      handleChatEvent(msg);
    } else if (topic === CHAT_MESSAGE_TOPIC) {
      handleMessageEvent(msg);
    }
  };

  const context = {chats, messages};

  return (
    <WsMessagesContext.Provider value={context}>
      <Component {...props} />
      <WsClient
        url={MESSAGE_WS_URL}
        topics={[CHAT_ROOT_TOPIC, CHAT_MESSAGE_TOPIC]}
        onMessage={onMessage}
      />
    </WsMessagesContext.Provider>
  );
};

export default withWsMessageClient;
