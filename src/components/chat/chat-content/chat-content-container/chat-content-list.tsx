import React, {FC, memo, ReactElement, useCallback, useEffect, useMemo, useState} from 'react';
import {Box} from '@material-ui/core';
import {chatContentListStyles} from './_styles';
import {Index, ListRowProps} from 'react-virtualized';
import {MessageListItem} from '../../../../models/message.model';
import {VirtualizedList, VirtualizedListMethods} from '../../../common/surfaces';
import ChatContentScrollButton from './chat-content-scroll-button';
import ChatContentItem from '../chat-content-item';
import {useUnreadMessagesContext} from '../../../../shared/contexts/chat-contexts/unread-messages-context';
import {Chat} from '../../../../models/chat.model';
import {RefUtils} from '../../../../shared/utils/ref.utils';

type Props = {
  chat: Chat;
  items: MessageListItem[];
  loadMoreItems: () => Promise<void>;
  updating: boolean;
  allLoaded: boolean;
};

const ChatContentList: FC<Props> = ({chat, items, loadMoreItems, updating, allLoaded}: Props) => {
  const classes = chatContentListStyles();
  const {unreadMessageCountMap} = useUnreadMessagesContext();
  const prevValues = RefUtils.usePrevious({items});
  const [virtualizedListRef, setVirtualizedListRef] = useState<VirtualizedListMethods>();

  const totalLoaded = useMemo<number>(() => {
    return allLoaded ? items.length : items.length + 1;
  }, [allLoaded, items]);

  const isMessageLoaded = useCallback(({index}: Index): boolean => {
    return index > 0 ? true : updating || allLoaded;
  }, [updating, allLoaded]);

  const showScrollButton = useMemo<boolean>(() => {
    return virtualizedListRef && !virtualizedListRef.isScrolledToBottom;
  }, [virtualizedListRef]);

  const scrollToBottom = useCallback((): void => {
    virtualizedListRef.scrollToBottom();
  }, [virtualizedListRef]);

  const isButtonHighlighted = useMemo<boolean>(() => {
    return unreadMessageCountMap?.get(chat.id) > 0;
  }, [unreadMessageCountMap, chat]);

  const wereNewItemsLoaded = useCallback((oldList: MessageListItem[], newList: MessageListItem[]): boolean => {
    const checkEquality = (i: number): boolean => JSON.stringify(oldList[i]) === JSON.stringify(newList[i]);
    return oldList && oldList.length > 2 && newList && newList.length > 2 && !checkEquality(0) && !checkEquality(1);
  }, []);

  useEffect(() => {
    const newItemsLoaded = wereNewItemsLoaded(prevValues?.items, items);
    if (newItemsLoaded) {
      virtualizedListRef?.clearAndRecomputeCache();
    }
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
        totalLength={totalLoaded}
        loadedLength={items.length}
        loadMoreRows={loadMoreItems}
        isRowLoaded={isMessageLoaded}
        reverseOrder
        virtualizedListRef={setVirtualizedListRef}
      />
      <ChatContentScrollButton
        show={showScrollButton}
        scrollToBottom={scrollToBottom}
        highlighted={isButtonHighlighted}
      />
    </Box>
  );
};

export default memo(ChatContentList);
