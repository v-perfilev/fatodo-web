import React, {FC, Ref, useCallback, useEffect, useImperativeHandle, useState} from 'react';
import {Chat} from '../../../../models/chat.model';
import ChatService from '../../../../services/chat.service';
import {useSnackContext} from '../../../../shared/contexts/snack-context';
import {Message, MessageReactions, MessageStatuses} from '../../../../models/message.model';
import {CircularSpinner} from '../../../../components/loaders';
import {ArrayUtils} from '../../../../shared/utils/array.utils';
import {DateFormatters} from '../../../../shared/utils/date.utils';
import {useWsChatContext} from '../../../../shared/contexts/chat-contexts/ws-chat-context';
import ChatContentContainer from './chat-content-container';
import {VirtualizedListMethods} from '../../../../components/surfaces';
import {User} from '../../../../models/user.model';
import {NEW_MESSAGES_PREFIX} from '../../_constants';
import {ChatItem} from '../types';

type Props = {
  chat: Chat;
  account: User;
  chatContentListRef?: Ref<ChatContentMethods>;
};

export type ChatContentMethods = {
  clearMessages: () => void;
  addMessage: (message: Message) => void;
};

const ChatContentList: FC<Props> = ({chat, account, chatContentListRef}: Props) => {
  const {messageNewEvent, messageUpdateEvent, messageStatusesEvent, messageReactionsEvent} = useWsChatContext();
  const {handleResponse} = useSnackContext();
  const [messages, setMessages] = useState<Message[]>([]);
  const [items, setItems] = useState<ChatItem[]>(undefined);
  const [allLoaded, setAllLoaded] = useState(false);
  const [loading, setLoading] = useState(true);
  const [listRef, setListRef] = useState<VirtualizedListMethods>();

  const convertMessagesToItems = useCallback((messagesToConvert: Message[]): ChatItem[] => {
    const handledDates = [] as string[];
    const handledItems = [] as ChatItem[];
    handledItems.push({});
    messagesToConvert.forEach((message) => {
      const date = DateFormatters.formatDateWithYear(new Date(message.createdAt));
      if (!handledDates.includes(date)) {
        handledDates.push(date);
        handledItems.push({date});
      }
      handledItems.push({message});
    });
    return handledItems;
  }, []);

  // UPDATERS

  const updateMessagesAndItems = useCallback(
    (updateFunc: (prevState: Message[]) => Message[]): void => {
      const combinedMessages = updateFunc(messages);
      const combinedItems = convertMessagesToItems(combinedMessages);
      setMessages(combinedMessages);
      setItems(combinedItems);
    },
    [messages, items]
  );

  const messageInserter = useCallback(
    (...messages: Message[]) => (prevState: Message[]): Message[] => {
      const combinedMessages = [...messages, ...prevState];
      return combinedMessages
        .filter(ArrayUtils.withIdFilter)
        .filter(ArrayUtils.uniqueByIdFilter)
        .sort(ArrayUtils.createdAtComparator);
    },
    []
  );

  const ownMessageInserter = useCallback(
    (message: Message) => (prevState: Message[]): Message[] => {
      const messageInChat = prevState.find((c) => c.id.startsWith(NEW_MESSAGES_PREFIX) && c.text === message.text);
      if (messageInChat) {
        ArrayUtils.deleteItem(prevState, messageInChat);
      }
      const combinedMessages = [message, ...prevState];
      return combinedMessages
        .filter(ArrayUtils.withIdFilter)
        .filter(ArrayUtils.uniqueByIdFilter)
        .sort(ArrayUtils.createdAtComparator);
    },
    []
  );

  const messageUpdater = useCallback(
    (message: Message) => (prevState: Message[]): Message[] => {
      const messageInList = prevState.find((m) => m.id === message.id);
      if (messageInList) {
        const index = prevState.indexOf(messageInList);
        prevState[index] = message;
      }
      return [...prevState];
    },
    []
  );

  const statusesUpdater = useCallback(
    (statuses: MessageStatuses) => (prevState: Message[]): Message[] => {
      const messageInList = prevState.find((m) => m.id === statuses.messageId);
      if (messageInList) {
        const index = prevState.indexOf(messageInList);
        prevState[index].statuses = statuses.statuses;
      }
      return [...prevState];
    },
    []
  );

  const reactionsUpdater = useCallback(
    (reactions: MessageReactions) => (prevState: Message[]): Message[] => {
      const messageInList = prevState.find((m) => m.id === reactions.messageId);
      if (messageInList) {
        const index = prevState.indexOf(messageInList);
        prevState[index].reactions = reactions.reactions;
      }
      return [...prevState];
    },
    []
  );

  // LOADERS

  const loadMoreMessages = useCallback((): Promise<void> => {
    return new Promise((resolve, reject) => {
      ChatService.getAllMessagesByChatIdPageable(chat.id, messages.length)
        .then((response) => {
          const newMessages = response.data;
          if (newMessages.length === 0) {
            setAllLoaded(true);
          } else {
            const updateFunc = messageInserter(...newMessages);
            updateMessagesAndItems(updateFunc);
          }
          resolve();
        })
        .catch((response) => {
          handleResponse(response);
          reject();
        })
        .finally(() => {
          setLoading(false);
        });
    });
  }, [messages.length, items]);

  // IMPERATIVE HANDLERS

  const clearMessages = useCallback((): void => {
    setMessages([]);
    setItems([]);
  }, []);

  const addMessage = useCallback(
    (message: Message) => {
      const updateFunc = messageInserter(message);
      updateMessagesAndItems(updateFunc);
    },
    [messages, items]
  );

  useImperativeHandle(
    chatContentListRef,
    (): ChatContentMethods => ({
      clearMessages,
      addMessage,
    }),
    [messages, items]
  );

  // EFFECTS

  useEffect(() => {
    loadMoreMessages().finally();
  }, [chat]);

  useEffect(() => {
    if (chat?.id === messageNewEvent?.chatId) {
      const updateFunc =
        messageNewEvent.userId === account.id ? ownMessageInserter(messageNewEvent) : messageInserter(messageNewEvent);
      updateMessagesAndItems(updateFunc);
    }
  }, [messageNewEvent]);

  useEffect(() => {
    if (chat?.id === messageUpdateEvent?.chatId) {
      const updateFunc = messageUpdater(messageUpdateEvent);
      updateMessagesAndItems(updateFunc);
      // clear cache for resize
      const index = items.findIndex((item) => item.message?.id === messageUpdateEvent.id);
      if (index !== undefined) {
        listRef?.clearCache(index);
      }
    }
  }, [messageUpdateEvent]);

  useEffect(() => {
    if (chat?.id === messageStatusesEvent?.chatId) {
      const updateFunc = statusesUpdater(messageStatusesEvent);
      updateMessagesAndItems(updateFunc);
    }
  }, [messageStatusesEvent]);

  useEffect(() => {
    if (chat?.id === messageReactionsEvent?.chatId) {
      const updateFunc = reactionsUpdater(messageReactionsEvent);
      updateMessagesAndItems(updateFunc);
    }
  }, [messageReactionsEvent]);

  // RENDERERS

  return loading ? (
    <CircularSpinner size="sm" />
  ) : (
    <ChatContentContainer
      chat={chat}
      items={items}
      loadMoreItems={loadMoreMessages}
      allLoaded={allLoaded}
      account={account}
      listRef={listRef}
      setListRef={setListRef}
    />
  );
};

export default ChatContentList;
