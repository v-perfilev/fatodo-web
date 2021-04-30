import React, {FC, memo, ReactElement, useCallback, useMemo, useState} from 'react';
import {Box} from '@material-ui/core';
import {chatContentListStyles} from './_styles';
import {MessageListItem} from '../../../../models/message.model';
import {VirtualizedList, VirtualizedListMethods} from '../../../common/surfaces';
import ChatContentScrollButton from './chat-content-scroll-button';
import ChatContentItem from '../chat-content-item';
import {useUnreadMessagesContext} from '../../../../shared/contexts/chat-contexts/unread-messages-context';
import {Chat} from '../../../../models/chat.model';
import {ListChildComponentProps} from 'react-window';

type Props = {
  chat: Chat;
  items: MessageListItem[];
  loadMoreItems: () => Promise<void>;
  allLoaded: boolean;
};

const ChatContentList: FC<Props> = ({chat, items, loadMoreItems, allLoaded}: Props) => {
  const classes = chatContentListStyles();
  const {unreadMessageCountMap} = useUnreadMessagesContext();
  const [virtualizedListRef, setVirtualizedListRef] = useState<VirtualizedListMethods>();

  const totalLoaded = useMemo<number>(() => {
    return allLoaded ? items.length : items.length + 1;
  }, [allLoaded, items]);

  const isMessageLoaded = useCallback((index: number): boolean => {
    return index > 0 ? true : allLoaded;
  }, [allLoaded]);

  const getItemKey = useCallback((index: number): string => {
    return items[index].message?.id || items[index].date;
  }, [items]);

  const showScrollButton = useMemo<boolean>(() => {
    return virtualizedListRef && !virtualizedListRef.isScrolledToBottom;
  }, [virtualizedListRef]);

  const scrollToBottom = useCallback((): void => {
    virtualizedListRef.scrollToBottom();
  }, [virtualizedListRef]);

  const isButtonHighlighted = useMemo<boolean>(() => {
    return unreadMessageCountMap?.get(chat.id) > 0;
  }, [unreadMessageCountMap, chat]);

  const messageRenderer = useCallback(
    ({index, style}: ListChildComponentProps): ReactElement => (
      <div style={style}>
        <ChatContentItem index={index} items={items} isVisible={true} />
      </div>
    ),
    [items]
  );

  return (
    <Box className={classes.root}>
      <VirtualizedList
        itemRenderer={messageRenderer}
        loadMoreItems={loadMoreItems}
        isItemLoaded={isMessageLoaded}
        totalLength={totalLoaded}
        loadedLength={items.length}
        itemKey={getItemKey}
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
