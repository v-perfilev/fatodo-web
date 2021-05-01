import React, {Dispatch, FC, memo, ReactElement, SetStateAction, useCallback, useMemo} from 'react';
import {Box} from '@material-ui/core';
import {chatContentListStyles} from './_styles';
import {MessageListItem} from '../../../../models/message.model';
import {VirtualizedList, VirtualizedListMethods} from '../../../common/surfaces';
import ChatContentScrollButton from './chat-content-scroll-button';
import ChatContentItem from '../chat-content-item';
import {useUnreadMessagesContext} from '../../../../shared/contexts/chat-contexts/unread-messages-context';
import {Chat} from '../../../../models/chat.model';
import {ListItemProps} from '../../../common/surfaces/virtualized-list/types';

type Props = {
  chat: Chat;
  items: MessageListItem[];
  loadMoreItems: () => Promise<void>;
  allLoaded: boolean;
  listRef: VirtualizedListMethods;
  setListRef: Dispatch<SetStateAction<VirtualizedListMethods>>;
};

const ChatContentList: FC<Props> = ({chat, items, loadMoreItems, allLoaded, listRef, setListRef}: Props) => {
  const classes = chatContentListStyles();
  const {unreadMessageCountMap} = useUnreadMessagesContext();

  const getItemKey = useCallback(
    (index: number): string => {
      return items[index].message?.id || items[index].date || 'spacer';
    },
    [items]
  );

  const showScrollButton = useMemo<boolean>(() => {
    return listRef && !listRef.isScrolledToBottom;
  }, [listRef]);

  const scrollToBottom = useCallback((): void => {
    listRef?.scrollToBottom();
  }, [listRef]);

  const isButtonHighlighted = useMemo<boolean>(() => {
    return unreadMessageCountMap?.get(chat.id) > 0;
  }, [unreadMessageCountMap, chat]);

  const messageRenderer = useCallback(
    ({index, isVisible, style}: ListItemProps): ReactElement => (
      <div style={style}>
        <ChatContentItem index={index} items={items} isVisible={isVisible} />
      </div>
    ),
    [items]
  );

  return (
    <Box className={classes.root}>
      <VirtualizedList
        itemRenderer={messageRenderer}
        loadMoreItems={loadMoreItems}
        loadedLength={items.length}
        allLoaded={allLoaded}
        itemKey={getItemKey}
        reverseOrder
        virtualizedListRef={setListRef}
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
