import React, {FC, memo, ReactElement, useEffect, useRef, useState} from 'react';
import {Box} from '@material-ui/core';
import {chatContentListStyles} from './_styles';
import {ListRowProps, ScrollParams} from 'react-virtualized';
import {MessageListItem} from '../../../../models/message.model';
import {VirtualizedList, VirtualizedListMethods} from '../../../common/surfaces';
import ChatContentScrollButton from './chat-content-scroll-button';
import ChatContentItem from '../chat-content-item';
import {useUnreadMessagesContext} from '../../../../shared/contexts/chat-contexts/unread-messages-context';
import {Chat} from '../../../../models/chat.model';

type Props = {
  chat: Chat;
  items: MessageListItem[];
  loadMore: () => Promise<void>;
  updating: boolean;
  allLoaded: boolean;
};

const ChatContentList: FC<Props> = ({chat, items, loadMore, updating, allLoaded}: Props) => {
  const classes = chatContentListStyles();
  const {unreadMessageCountMap} = useUnreadMessagesContext();
  const [scrolledToBottom, setScrolledToBottom] = useState(true);
  const [scrollParams, setScrollParams] = useState<ScrollParams>();
  const virtualizedListRef = useRef<VirtualizedListMethods>();

  const unreadCount = unreadMessageCountMap?.get(chat.id);

  const loadMoreMessages = (): Promise<void> =>
    new Promise((resolve) => {
      loadMore().finally(() => resolve());
    });

  const isMessageLoaded = ({index}): boolean => {
    return index > 0 ? true : updating || allLoaded;
  };

  const recalculateRows = (): void => {
    virtualizedListRef.current.clearCache();
    virtualizedListRef.current.recomputeRowHeights();
  };

  const initList = (): void => {
    setTimeout(() => {
      recalculateRows();
      virtualizedListRef.current.scrollToIndex(items.length - 1);
    }, 0);
  };

  const onScroll = (params: ScrollParams): void => {
    const {clientHeight, scrollHeight, scrollTop} = params;
    setScrolledToBottom(clientHeight === 0 || scrollHeight === scrollTop + clientHeight);
    setScrollParams(scrollParams);
  };

  useEffect(() => {
    initList();
  }, []);

  useEffect(() => {
    recalculateRows();
  }, [items]);

  const messageRenderer = ({index, isVisible, style}: ListRowProps): ReactElement => (
    <div style={style}>
      <ChatContentItem index={index} items={items} isVisible={isVisible} />
    </div>
  );

  return (
    <Box className={classes.root}>
      <VirtualizedList
        renderer={messageRenderer}
        isRowLoaded={isMessageLoaded}
        loadMoreRows={loadMoreMessages}
        loadedLength={items.length}
        totalLength={allLoaded ? items.length : items.length + 1}
        onScroll={onScroll}
        scrollToIndex={scrolledToBottom ? items.length - 1 : undefined}
        virtualizedListRef={virtualizedListRef}
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
