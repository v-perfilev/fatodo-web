import React, {FC, memo, ReactElement, useEffect, useRef, useState} from 'react';
import {Box} from '@material-ui/core';
import {chatContentListStyles} from './_styles';
import {Chat} from '../../../../models/chat.model';
import {ListRowProps, ScrollParams} from 'react-virtualized';
import {User} from '../../../../models/user.model';
import ChatService from '../../../../services/chat.service';
import {useSnackContext} from '../../../../shared/contexts/snack-context';
import {Message} from '../../../../models/message.model';
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
import ChatContentMessage from '../chat-content-message';

type Props = {
  chat: Chat;
  account: User;
};

const ChatContentList: FC<Props> = ({chat, account}: Props) => {
  const classes = chatContentListStyles();
  const {messageNewEvent, messageUpdateEvent, messageStatusesEvent, messageReactionsEvent} = useWsChatContext();
  const {unreadMessageCountMap} = useUnreadMessagesContext();
  const {handleResponse} = useSnackContext();
  const [messages, setMessages] = useState<Message[]>([]);
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

  const addLoadedMessagesToState = (loadedMessages: Message[]): void => {
    setMessages((prevState) => {
      const combinedMessages = [...loadedMessages, ...prevState];
      return combinedMessages.filter(ArrayUtils.uniqueByIdFilter).sort(ArrayUtils.createdAtComparator);
    });
    if (virtualizedCacheRef) {
      virtualizedCacheRef.current.clearCache();
    }
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
    <ChatContentMessage index={index} messages={messages} account={account} isVisible={isVisible} style={style} />
  );

  return loading ? (
    <CircularSpinner size="sm" />
  ) : (
    <Box className={classes.root}>
      <VirtualizedList
        renderer={messageRenderer}
        isRowLoaded={isMessageLoaded}
        loadMoreRows={loadMoreMessages}
        loadedLength={messages.length}
        totalLength={allMessagesLoaded ? messages.length : messages.length + 1}
        onScroll={onScroll}
        scrollToIndex={scrolledToBottom ? messages.length - 1 : undefined}
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
