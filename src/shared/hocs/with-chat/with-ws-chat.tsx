import * as React from 'react';
import {ComponentType, FC, PropsWithChildren, ReactElement, useCallback, useEffect, useMemo, useState} from 'react';
import {WsChatContext} from '../../contexts/chat-contexts/ws-chat-context';
import {Chat} from '../../../models/chat.model';
import {Message, MessageReactions, MessageStatuses} from '../../../models/message.model';
import {useWsContext} from '../../contexts/ws-contexts/ws-context';

enum WsChatDestinations {
  CHAT_NEW = '/user/chat/new',
  CHAT_UPDATE = '/user/chat/update',
  CHAT_LAST_MESSAGE = '/user/chat/last-message',
  CHAT_LAST_MESSAGE_UPDATE = '/user/chat/last-message-update',
  MESSAGE_NEW = '/user/message/new/',
  MESSAGE_UPDATE = '/user/message/update/',
  MESSAGE_STATUS = '/user/message/status/',
  MESSAGE_REACTION = '/user/message/reaction/',
}

type Props = PropsWithChildren<HTMLElement>;

const withWsChat = (Component: ComponentType): FC => (props: Props): ReactElement => {
  const {setTopicsAndHandler, removeTopicsAndHandler} = useWsContext();
  const [chatId, setChatId] = useState<string>();
  const [chatNewEvent, setChatNewEvent] = useState<Chat>(null);
  const [chatUpdateEvent, setChatUpdateEvent] = useState<Chat>(null);
  const [chatLastMessageEvent, setChatLastMessageEvent] = useState<Chat>(null);
  const [chatLastMessageUpdateEvent, setChatLastMessageUpdateEvent] = useState<Chat>(null);
  const [messageNewEvent, setMessageNewEvent] = useState<Message>(null);
  const [messageUpdateEvent, setMessageUpdateEvent] = useState<Message>(null);
  const [messageStatusesEvent, setMessageStatusesEvent] = useState<MessageStatuses>(null);
  const [messageReactionsEvent, setMessageReactionsEvent] = useState<MessageReactions>(null);

  const handler = useCallback((msg: any, topic: string): void => {
    if (topic === WsChatDestinations.CHAT_NEW) {
      setChatNewEvent(msg);
    } else if (topic.startsWith(WsChatDestinations.CHAT_UPDATE)) {
      setChatUpdateEvent(msg);
    } else if (topic.startsWith(WsChatDestinations.CHAT_LAST_MESSAGE)) {
      setChatLastMessageEvent(msg);
    } else if (topic.startsWith(WsChatDestinations.CHAT_LAST_MESSAGE_UPDATE)) {
      setChatLastMessageUpdateEvent(msg);
    } else if (topic.startsWith(WsChatDestinations.MESSAGE_NEW)) {
      setMessageNewEvent(msg);
    } else if (topic.startsWith(WsChatDestinations.MESSAGE_UPDATE)) {
      setMessageUpdateEvent(msg);
    } else if (topic.startsWith(WsChatDestinations.MESSAGE_STATUS)) {
      setMessageStatusesEvent(msg);
    } else if (topic.startsWith(WsChatDestinations.MESSAGE_REACTION)) {
      setMessageReactionsEvent(msg);
    }
  }, []);

  const topics = useMemo<string[]>(() => {
    const wsTopics = [
      WsChatDestinations.CHAT_NEW,
      WsChatDestinations.CHAT_UPDATE,
      WsChatDestinations.CHAT_LAST_MESSAGE,
      WsChatDestinations.CHAT_LAST_MESSAGE_UPDATE,
    ] as string[];
    if (chatId) {
      wsTopics.push(
        WsChatDestinations.MESSAGE_NEW + chatId,
        WsChatDestinations.MESSAGE_UPDATE + chatId,
        WsChatDestinations.MESSAGE_STATUS + chatId,
        WsChatDestinations.MESSAGE_REACTION + chatId
      );
    }
    return wsTopics;
  }, [chatId]);

  useEffect(() => {
    setTopicsAndHandler('WS_CHAT', {topics, handler});
    return (): void => removeTopicsAndHandler('WS_CHAT');
  }, [chatId]);

  const context = {
    selectChatIdForWs: setChatId,
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
    </WsChatContext.Provider>
  );
};

export default withWsChat;
