import React, {FC, memo, ReactElement, useCallback, useMemo, useState} from 'react';
import {Box} from '@material-ui/core';
import {chatContentListStyles} from './_styles';
import {Index, ListRowProps} from 'react-virtualized';
import {MessageListItem} from '../../../../models/message.model';
import {VirtualizedList, VirtualizedListMethods} from '../../../common/surfaces';
import ChatContentScrollButton from './chat-content-scroll-button';
import ChatContentItem from '../chat-content-item';
import {useUnreadMessagesContext} from '../../../../shared/contexts/chat-contexts/unread-messages-context';
import {Chat} from '../../../../models/chat.model';

type Props = {
  chat: Chat;
  items: MessageListItem[];
  loadMoreItems: () => Promise<void>;
  loading: boolean;
  allLoaded: boolean;
};

const ChatContentList: FC<Props> = ({chat, items, loadMoreItems, loading, allLoaded}: Props) => {
  const classes = chatContentListStyles();
  const {unreadMessageCountMap} = useUnreadMessagesContext();
  const [virtualizedListRef, setVirtualizedListRef] = useState<VirtualizedListMethods>();

  const totalLoaded = useMemo<number>(() => {
    return allLoaded ? items.length : items.length + 1;
  }, [allLoaded, items]);

  const isMessageLoaded = useCallback(({index}: Index): boolean => {
    return index > 0 ? true : loading || allLoaded;
  }, [loading, allLoaded]);

  const showScrollButton = useMemo<boolean>(() => {
    return virtualizedListRef && !virtualizedListRef.isScrolledToBottom;
  }, [virtualizedListRef]);

  const scrollToBottom = useCallback((): void => {
    virtualizedListRef.scrollToBottom();
  }, [virtualizedListRef]);

  const isButtonHighlighted = useMemo<boolean>(() => {
    return unreadMessageCountMap?.get(chat.id) > 0;
  }, [unreadMessageCountMap, chat]);

  const messageRenderer = useCallback(({index, isVisible, style}: ListRowProps): ReactElement => (
    <div style={style}>
      <ChatContentItem index={index} items={items} isVisible={isVisible} />
    </div>
  ), [items]);

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
