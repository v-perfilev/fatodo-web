import React, {FC, ReactElement, useEffect, useState} from 'react';
import {Box} from '@material-ui/core';
import {messageContentListStyles} from './_styles';
import {Chat} from '../../../../models/chat.model';
import {ListRowProps, ScrollParams} from 'react-virtualized';
import {User} from '../../../../models/user.model';
import MessageService from '../../../../services/message.service';
import {useSnackContext} from '../../../../shared/contexts/snack-context';
import {Message} from '../../../../models/message.model';
import {useWsMessagesContext} from '../../../../shared/contexts/messenger-contexts/ws-messages-context';
import MessageContentBox from '..//message-content-box';
import {CircularSpinner} from '../../../common/loaders';
import {
  handleMessageNewEvent,
  handleMessageReactionsEvent,
  handleMessageStatusesEvent,
  handleMessageUpdateEvent
} from './_ws';
import {VirtualizedList} from '../../../common/surfaces';
import {useUnreadMessagesContext} from '../../../../shared/contexts/messenger-contexts/unread-messages-context';
import MessageContentScrollButton from './message-content-scroll-button';
import {ArrayUtils} from '../../../../shared/utils/array.utils';

type Props = {
  chat: Chat;
  account: User;
};

const MessageContentList: FC<Props> = ({chat, account}: Props) => {
    const classes = messageContentListStyles();
    const {messageNewEvent, messageUpdateEvent, messageStatusesEvent, messageReactionsEvent} = useWsMessagesContext();
    const {unreadMessageCountMap} = useUnreadMessagesContext();
    const {handleResponse} = useSnackContext();
    const [messages, setMessages] = useState<Message[]>([]);
    const [loading, setLoading] = useState(true);
    const [allMessagesLoaded, setAllMessagesLoaded] = useState(false);
    const [scrolledToBottom, setScrolledToBottom] = useState(true);
    const [shouldScrollDown, setShouldScrollDown] = useState(true);

    const unreadCount = unreadMessageCountMap?.get(chat.id);

    const onScroll = ({clientHeight, scrollHeight, scrollTop}: ScrollParams): void => {
      const isNotRendered = clientHeight === 0;
      const isScrolledToBottom = scrollHeight === scrollTop + clientHeight || clientHeight === 0;
      setScrolledToBottom(isScrolledToBottom);
      setShouldScrollDown(isNotRendered || isScrolledToBottom);
    };

    const addLoadedMessageToState = (loadedMessages: Message[]): void => {
      setMessages((prevState) => {
        const combinedMessages = [...loadedMessages, ...prevState];
        return combinedMessages
          .filter(ArrayUtils.uniqueByIdFilter)
          .sort(ArrayUtils.createdAtComparator);
      });
    };

    const loadMoreMessages = (): Promise<void> => new Promise((resolve) => {
      MessageService.getAllMessagesByChatIdPageable(chat.id, messages.length)
        .then((response) => {
          const newMessages = response.data;
          if (newMessages.length === 0) {
            setAllMessagesLoaded(true);
          } else {
            addLoadedMessageToState(newMessages);
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
      <MessageContentBox index={index} messages={messages} account={account} isVisible={isVisible} style={style} />
    );

    return loading ? (
      <CircularSpinner size="sm" />
    ) : (
      <Box className={classes.root}>
        <VirtualizedList
          renderer={messageRenderer}
          isRowLoaded={({index}) => index > 0 ? true : allMessagesLoaded}
          loadMoreRows={loadMoreMessages}
          loadedLength={messages.length}
          totalLength={allMessagesLoaded ? messages?.length : messages?.length + 1}
          onScroll={onScroll}
          scrollToIndex={shouldScrollDown ? messages.length - 1 : undefined}
        />
        <MessageContentScrollButton
          show={!scrolledToBottom}
          highlighted={unreadCount > 0}
          setShouldScrollDown={setShouldScrollDown}
        />
      </Box>
    );
  }
;

export default MessageContentList;
