import React, {Dispatch, FC, ReactElement, SetStateAction, useCallback, useMemo} from 'react';
import {Box} from '@material-ui/core';
import {VirtualizedList, VirtualizedListMethods} from '../../../../components/surfaces';
import ChatContentListScrollButton from './chat-content-list-scroll-button';
import {useUnreadMessagesContext} from '../../../../shared/contexts/chat-contexts/unread-messages-context';
import {Chat} from '../../../../models/chat.model';
import {User} from '../../../../models/user.model';
import {ChatItem, ChatItemProps, ChatListDataProps} from '../types';
import ChatContentRenderer from './chat-content-list-renderer';
import {chatContentListContainerStyles} from './_styles';

type Props = {
  chat: Chat;
  items: ChatItem[];
  loadMoreItems: () => Promise<void>;
  allLoaded: boolean;
  account: User;
  listRef: VirtualizedListMethods;
  setListRef: Dispatch<SetStateAction<VirtualizedListMethods>>;
};

const ChatContentListContainer: FC<Props> = (props: Props) => {
  const {chat, items, loadMoreItems, allLoaded, account, listRef, setListRef} = props;
  const classes = chatContentListContainerStyles();
  const {unreadMessageCountMap} = useUnreadMessagesContext();

  const getItemKey = useCallback(
    (index: number): string => {
      return items[index].message?.id || items[index].date || 'spacer';
    },
    [items]
  );

  const visibleItems = useMemo<number[]>(() => {
    return listRef?.visibleItems;
  }, [listRef?.visibleItems]);

  const showScrollButton = useMemo<boolean>(() => {
    return listRef && !listRef.isScrolledToBottom;
  }, [listRef?.isScrolledToBottom]);

  const scrollToBottom = useCallback((): void => {
    listRef?.scrollToBottom();
  }, [listRef]);

  const isButtonHighlighted = useMemo<boolean>(() => {
    return unreadMessageCountMap?.get(chat.id) > 0;
  }, [unreadMessageCountMap, chat]);

  const itemData = useMemo<ChatListDataProps>(
    () => ({
      visibleItems,
      items,
      account,
    }),
    [visibleItems, items, account]
  );

  const itemRenderer = useCallback((props: ChatItemProps): ReactElement => <ChatContentRenderer {...props} />, []);

  return (
    <Box className={classes.root}>
      <VirtualizedList
        itemRenderer={itemRenderer}
        itemData={itemData}
        loadMoreItems={loadMoreItems}
        allLoaded={allLoaded}
        itemKey={getItemKey}
        reverseOrder
        virtualizedListRef={setListRef}
      />
      <ChatContentListScrollButton
        show={showScrollButton}
        scrollToBottom={scrollToBottom}
        highlighted={isButtonHighlighted}
      />
    </Box>
  );
};

export default ChatContentListContainer;