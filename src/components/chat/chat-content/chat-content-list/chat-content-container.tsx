import React, {Dispatch, FC, memo, ReactElement, SetStateAction, useCallback, useMemo} from 'react';
import {Box} from '@material-ui/core';
import {chatContentListStyles} from './_styles';
import {MessageListItem} from '../../../../models/message.model';
import {VirtualizedListMethods} from '../../../common/surfaces';
import ChatContentScrollButton from './chat-content-scroll-button';
import {useUnreadMessagesContext} from '../../../../shared/contexts/chat-contexts/unread-messages-context';
import {Chat} from '../../../../models/chat.model';
import {User} from '../../../../models/user.model';
import VirtualizedList from '../../../common/surfaces/virtualized-list';
import {ChatContentItemDataProps, ChatContentItemProps} from './types';
import ChatContentRenderer from './chat-content-renderer';

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

  const itemRenderer = useCallback(
    (props: ChatContentItemProps): ReactElement => <ChatContentRenderer {...props} />,
    []
  );

  const itemData = useMemo<ChatContentItemDataProps>(
    () => ({
      items,
      account,
    }),
    [items, account]
  );

  return (
    <Box className={classes.root}>
      <VirtualizedList
        itemRenderer={itemRenderer}
        itemData={itemData}
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

export default memo(ChatContentContainer);
