import React, {FC, Ref, useCallback, useEffect, useImperativeHandle, useState} from 'react';
import {Chat} from '../../../../models/chat.model';
import ChatService from '../../../../services/chat.service';
import {useSnackContext} from '../../../../shared/contexts/snack-context';
import {Message, MessageListItem, MessageReactions, MessageStatuses} from '../../../../models/message.model';
import {CircularSpinner} from '../../../common/loaders';
import {ArrayUtils} from '../../../../shared/utils/array.utils';
import {DateFormatters} from '../../../../shared/utils/date.utils';
import {useWsChatContext} from '../../../../shared/contexts/chat-contexts/ws-chat-context';
import ChatContentList from './chat-content-list';

type Props = {
  chat: Chat;
  chatContentListRef?: Ref<ChatContentMethods>;
};

export type ChatContentMethods = {
  clearMessages: () => void;
};

const ChatContentContainer: FC<Props> = ({chat, chatContentListRef}: Props) => {
  const {messageNewEvent, messageUpdateEvent, messageStatusesEvent, messageReactionsEvent} = useWsChatContext();
  const {handleResponse} = useSnackContext();
  const [messages, setMessages] = useState<Message[]>([]);
  const [items, setItems] = useState<MessageListItem[]>([]);
  const [allMessagesLoaded, setAllMessagesLoaded] = useState(false);
  const [loading, setLoading] = useState(true);
  const [updating, setUpdating] = useState(false);

  const clearMessages = useCallback((): void => {
    setMessages([]);
    setItems([]);
  }, []);

  useImperativeHandle(
    chatContentListRef,
    (): ChatContentMethods => ({clearMessages})
  );

  const updateItemsFromMessages = (updatedMessages: Message[]): void => {
    const handledDates = [] as string[];
    const handledItems = [] as MessageListItem[];
    updatedMessages.forEach((message) => {
      const date = DateFormatters.formatDateWithYear(new Date(message.createdAt));
      if (!handledDates.includes(date)) {
        handledDates.push(date);
        handledItems.push({date});
      }
      handledItems.push({message});
    });
    setItems(handledItems);
  };

  const updateMessages = (updateFunc: (prevState: Message[]) => Message[]): void => {
    setMessages((prevState) => {
      const combinedMessages = updateFunc(prevState);
      updateItemsFromMessages(combinedMessages);
      return combinedMessages;
    });
  };

  const messageInserter = (...messages: Message[]) => (prevState: Message[]): Message[] => {
    const combinedMessages = [...messages, ...prevState];
    return combinedMessages.filter(ArrayUtils.uniqueByIdFilter).sort(ArrayUtils.createdAtComparator);
  };

  const messageUpdater = (message: Message) => (prevState: Message[]): Message[] => {
    const messageInList = prevState.find((m) => m.id === message.id);
    if (messageInList) {
      const index = prevState.indexOf(messageInList);
      prevState[index] = message;
    }
    return [...prevState];
  };

  const statusesUpdater = (messageStatuses: MessageStatuses) => (prevState: Message[]): Message[] => {
    const messageInList = prevState.find((m) => m.id === messageStatuses.messageId);
    if (messageInList) {
      const index = prevState.indexOf(messageInList);
      prevState[index].statuses = messageStatuses.statuses;
    }
    return [...prevState];
  };

  const reactionsUpdater = (messageReactions: MessageReactions) => (prevState: Message[]): Message[] => {
    const messageInList = prevState.find((m) => m.id === messageReactions.messageId);
    if (messageInList) {
      const index = prevState.indexOf(messageInList);
      prevState[index].reactions = messageReactions.reactions;
    }
    return [...prevState];
  };

  const loadMoreMessages = (): Promise<void> =>
    new Promise((resolve) => {
      setUpdating(true);
      ChatService.getAllMessagesByChatIdPageable(chat.id, messages.length)
        .then((response) => {
          const newMessages = response.data;
          if (newMessages.length === 0) {
            setAllMessagesLoaded(true);
          } else {
            const updateFunc = messageInserter(...newMessages);
            updateMessages(updateFunc);
          }
        })
        .catch((response) => {
          handleResponse(response);
        })
        .finally(() => {
          setLoading(false);
          setUpdating(false);
          resolve();
        });
    });

  useEffect(() => {
    loadMoreMessages().finally();
  }, [chat]);

  useEffect(() => {
    if (chat?.id === messageNewEvent?.chatId) {
      const updateFunc = messageInserter(messageNewEvent);
      updateMessages(updateFunc);
    }
  }, [messageNewEvent]);

  useEffect(() => {
    if (chat?.id === messageNewEvent?.chatId) {
      const updateFunc = messageUpdater(messageUpdateEvent);
      updateMessages(updateFunc);
    }
  }, [messageUpdateEvent]);

  useEffect(() => {
    if (chat?.id === messageStatusesEvent?.chatId) {
      const updateFunc = statusesUpdater(messageStatusesEvent);
      updateMessages(updateFunc);
    }
  }, [messageStatusesEvent]);

  useEffect(() => {
    if (chat?.id === messageReactionsEvent?.chatId) {
      const updateFunc = reactionsUpdater(messageReactionsEvent);
      updateMessages(updateFunc);
    }
  }, [messageReactionsEvent]);

  return loading ? (
    <CircularSpinner size="sm" />
  ) : (
    <ChatContentList
      chat={chat}
      items={items}
      loadMoreItems={loadMoreMessages}
      updating={updating}
      allLoaded={allMessagesLoaded}
    />
  );
};

export default ChatContentContainer;
