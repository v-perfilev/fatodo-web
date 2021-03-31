import React, {FC, ReactElement, useEffect, useState} from 'react';
import {Box} from '@material-ui/core';
import {messageContentListStyles} from './_styles';
import {Chat} from '../../../../models/chat.model';
import {AutoSizer, CellMeasurer, CellMeasurerCache, InfiniteLoader, List} from 'react-virtualized';
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

type Props = {
  chat: Chat;
  account: User;
};

const cellMeasurerCache = new CellMeasurerCache({
  defaultHeight: 100,
  fixedWidth: true
});

const MessageContentList: FC<Props> = ({chat, account}: Props) => {
    const classes = messageContentListStyles();
    const {messageNewEvent, messageUpdateEvent, messageStatusesEvent, messageReactionsEvent} = useWsMessagesContext();
    const {handleResponse} = useSnackContext();
    const [loading, setLoading] = useState(true);
    const [rendered, setRendered] = useState(false);
    const [allMessagesLoaded, setAllMessagesLoaded] = useState(false);
    const [messages, setMessages] = useState<Message[]>([]);

    const messageCount = allMessagesLoaded ? messages?.length : messages?.length + 1;

    const isMessageLoaded = ({index}: any): boolean => index > 0 ? true : allMessagesLoaded;

    const addLoadedMessageToState = (loadedMessages: Message[]): void => {
      const comparator = (a: Message, b: Message): number => a.createdAt > b.createdAt ? 1 : -1;
      setMessages((prevState) => {
        const combinedMessages = [...loadedMessages, ...prevState];
        return combinedMessages.sort(comparator);
      });
    };

    const loadMoreMessages = (): void => {
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
        });
    };

    const handleRowsRendered = (onRowsRendered: Function, params: any): void => {
      onRowsRendered(params);
      if (!rendered && messages.length - 1 === params.stopIndex) {
        setTimeout(() => setRendered(true), 1000);
      }
    };

    useEffect(() => {
      loadMoreMessages();
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

    const listLoader = (): ReactElement => (
      <InfiniteLoader
        isRowLoaded={isMessageLoaded}
        loadMoreRows={loadMoreMessages}
        rowCount={messageCount}
      >
        {listAutoSizer}
      </InfiniteLoader>
    );

    const listAutoSizer = ({onRowsRendered, registerChild}: any): ReactElement => (
      <AutoSizer>{listRenderer(onRowsRendered, registerChild)}</AutoSizer>
    );

    const listRenderer = (onRowsRendered: any, registerChild: any) => ({height, width}: any): ReactElement => (
      <List
        height={height}
        width={width}
        onRowsRendered={(params) => handleRowsRendered(onRowsRendered, params)}
        ref={registerChild}
        deferredMeasurementCache={cellMeasurerCache}
        rowCount={messages.length}
        rowHeight={cellMeasurerCache.rowHeight}
        overscanRowCount={10}
        scrollToIndex={rendered ? undefined : messages.length - 1}
        rowRenderer={rowRenderer}
      />
    );

    const rowRenderer = ({index, isVisible, key, parent, style}: any): ReactElement => (
      <CellMeasurer cache={cellMeasurerCache} columnIndex={0} key={key} parent={parent} rowIndex={index}>
        <MessageContentBox message={messages[index]} account={account} isVisible={isVisible} key={key}
                           style={style} />
      </CellMeasurer>
    );

    return loading ? (
      <CircularSpinner size="sm" />
    ) : (
      <Box className={classes.root}>
        {listLoader()}
      </Box>
    );
  }
;

export default MessageContentList;
