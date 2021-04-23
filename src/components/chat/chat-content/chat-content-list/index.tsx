import React, {Dispatch, FC, memo, ReactElement, SetStateAction, useEffect, useRef, useState} from 'react';
import {Box} from '@material-ui/core';
import {chatContentListStyles} from './_styles';
import {Chat} from '../../../../models/chat.model';
import {ListRowProps, ScrollParams} from 'react-virtualized';
import ChatService from '../../../../services/chat.service';
import {useSnackContext} from '../../../../shared/contexts/snack-context';
import {Message, MessageListItem} from '../../../../models/message.model';
import {useWsChatContext} from '../../../../shared/contexts/chat-contexts/ws-chat-context';
import {CircularSpinner} from '../../../common/loaders';
import {
  handleMessageNewEvent,
  handleMessageReactionsEvent,
  handleMessageStatusesEvent,
  handleMessageUpdateEvent,
} from './_ws';
import {VirtualizedCache, VirtualizedList} from '../../../common/surfaces';
import {useUnreadMessagesContext} from '../../../../shared/contexts/chat-contexts/unread-messages-context';
import ChatContentScrollButton from './chat-content-scroll-button';
import {ArrayUtils} from '../../../../shared/utils/array.utils';
import ChatContentItem from '../chat-content-item';
import {DateFormatters} from '../../../../shared/utils/date.utils';

type Props = {
  chat: Chat;
  messages: Message[];
  setMessages: Dispatch<SetStateAction<Message[]>>;
};

const ChatContentList: FC<Props> = ({chat, messages, setMessages}: Props) => {
  const classes = chatContentListStyles();
  const {messageNewEvent, messageUpdateEvent, messageStatusesEvent, messageReactionsEvent} = useWsChatContext();
  const {unreadMessageCountMap} = useUnreadMessagesContext();
  const {handleResponse} = useSnackContext();
  const [items, setItems] = useState<MessageListItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [allMessagesLoaded, setAllMessagesLoaded] = useState(false);
  const [scrolledToBottom, setScrolledToBottom] = useState(true);
  const virtualizedCacheRef = useRef<VirtualizedCache>();

  const unreadCount = unreadMessageCountMap?.get(chat.id);

  const isMessageLoaded = ({index}): boolean => {
    return index > 0 ? true : allMessagesLoaded;
  };

  const onScroll = ({clientHeight, scrollHeight, scrollTop}: ScrollParams): void => {
    const isScrolledToBottom = scrollHeight === scrollTop + clientHeight;
    const isNotRendered = clientHeight === 0;
    setScrolledToBottom(isScrolledToBottom || isNotRendered);
  };

  const handleMessages = (): void => {
    const handledDates = [];
    const handledItems = [];
    messages.forEach((message) => {
      const date = DateFormatters.formatDateWithYear(new Date(message.createdAt));
      if (!handledDates.includes(date)) {
        handledDates.push(date);
        handledItems.push({date});
      }
      handledItems.push({message});
    });
    setItems(handledItems);
  };

  const addLoadedMessagesToState = (loadedMessages: Message[]): void => {
    setMessages((prevState) => {
      const combinedMessages = [...loadedMessages, ...prevState];
      return combinedMessages.filter(ArrayUtils.uniqueByIdFilter).sort(ArrayUtils.createdAtComparator);
    });
  };

  const loadMoreMessages = (): Promise<void> =>
    new Promise((resolve) => {
      ChatService.getAllMessagesByChatIdPageable(chat.id, messages.length)
        .then((response) => {
          const newMessages = response.data;
          if (newMessages.length === 0) {
            setAllMessagesLoaded(true);
          } else {
            addLoadedMessagesToState(newMessages);
          }
        })
        .catch((response) => {
          handleResponse(response);
        })
        .finally(() => {
          setLoading(false);
          resolve();
        });
    });

  useEffect(() => {
    loadMoreMessages().finally();
  }, [chat]);

  useEffect(() => {
    handleMessages();
  }, [messages]);

  useEffect(() => {
    if (virtualizedCacheRef && items.length > 0) {
      virtualizedCacheRef.current.clearCache();
    }
  }, [items]);

  useEffect(() => {
    handleMessageNewEvent(chat, messageNewEvent, setMessages);
  }, [messageNewEvent]);

  useEffect(() => {
    handleMessageUpdateEvent(chat, messageUpdateEvent, setMessages);
  }, [messageUpdateEvent]);

  useEffect(() => {
    handleMessageStatusesEvent(chat, messageStatusesEvent, setMessages);
  }, [messageStatusesEvent]);

  useEffect(() => {
    handleMessageReactionsEvent(chat, messageReactionsEvent, setMessages);
  }, [messageReactionsEvent]);

  const messageRenderer = ({index, isVisible, style}: ListRowProps): ReactElement => (
    <ChatContentItem item={items[index]} isVisible={isVisible} isFirst={index === 0} style={style} />
  );

  return loading ? (
    <CircularSpinner size="sm" />
  ) : (
    <Box className={classes.root}>
      <VirtualizedList
        renderer={messageRenderer}
        isRowLoaded={isMessageLoaded}
        loadMoreRows={loadMoreMessages}
        loadedLength={items.length}
        totalLength={allMessagesLoaded ? items.length : items.length + 1}
        onScroll={onScroll}
        scrollToIndex={scrolledToBottom ? items.length - 1 : undefined}
        virtualizedCacheRef={virtualizedCacheRef}
      />
      <ChatContentScrollButton
        show={!scrolledToBottom}
        highlighted={unreadCount > 0}
        setShouldScrollDown={setScrolledToBottom}
      />
    </Box>
  );
};

export default memo(ChatContentList);
