import React, {Dispatch, FC, ReactElement, SetStateAction, useCallback, useMemo} from 'react';
import {Box} from '@material-ui/core';
import {MessageListItem} from '../../../../models/message.model';
import {VirtualizedList, VirtualizedListMethods} from '../../../common/surfaces';
import ChatContentScrollButton from './chat-content-scroll-button';
import {useUnreadMessagesContext} from '../../../../shared/contexts/chat-contexts/unread-messages-context';
import {Chat} from '../../../../models/chat.model';
import {User} from '../../../../models/user.model';
import {ChatContentItemDataProps, ChatContentItemProps} from './types';
import ChatContentRenderer from './chat-content-renderer';
import {chatContentContainerStyles} from './_styles';

type Props = {
  chat: Chat;
  items: MessageListItem[];
  loadMoreItems: () => Promise<void>;
  allLoaded: boolean;
  account: User;
  listRef: VirtualizedListMethods;
  setListRef: Dispatch<SetStateAction<VirtualizedListMethods>>;
};

const ChatContentContainer: FC<Props> = (props: Props) => {
  const {chat, items, loadMoreItems, allLoaded, account, listRef, setListRef} = props;
  const classes = chatContentContainerStyles();
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

  const itemRenderer = useCallback(
    (props: ChatContentItemProps): ReactElement => <ChatContentRenderer {...props} />,
    []
  );

  const itemData = useMemo<ChatContentItemDataProps>(
    () => ({
      visibleItems,
      items,
      account,
    }),
    [visibleItems, items, account]
  );

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
      <ChatContentScrollButton
        show={showScrollButton}
        scrollToBottom={scrollToBottom}
        highlighted={isButtonHighlighted}
      />
    </Box>
  );
};

export default ChatContentContainer;
