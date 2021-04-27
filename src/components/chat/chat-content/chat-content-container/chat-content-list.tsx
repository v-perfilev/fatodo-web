import React, {FC, memo, ReactElement, useState} from 'react';
import {Box} from '@material-ui/core';
import {chatContentListStyles} from './_styles';
import {ListRowProps} from 'react-virtualized';
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
  updating: boolean;
  allLoaded: boolean;
};

const ChatContentList: FC<Props> = ({chat, items, loadMoreItems, updating, allLoaded}: Props) => {
  const classes = chatContentListStyles();
  const {unreadMessageCountMap} = useUnreadMessagesContext();
  const [virtualizedListRef, setVirtualizedListRef] = useState<VirtualizedListMethods>();

  const unreadCount = unreadMessageCountMap?.get(chat.id);

  const isMessageLoaded = ({index}): boolean => {
    return index > 0 ? true : updating || allLoaded;
  };

  const messageRenderer = ({index, isVisible, style}: ListRowProps): ReactElement => (
    <div style={style}>
      <ChatContentItem index={index} items={items} isVisible={isVisible} />
    </div>
  );

  return (
    <Box className={classes.root}>
      <VirtualizedList
        renderer={messageRenderer}
        totalLength={allLoaded ? items.length : items.length + 1}
        loadedLength={items.length}
        loadMoreRows={loadMoreItems}
        isRowLoaded={isMessageLoaded}
        reverseOrder
        virtualizedListRef={setVirtualizedListRef}
      />
      <ChatContentScrollButton
        show={virtualizedListRef && !virtualizedListRef.isScrolledToBottom}
        highlighted={unreadCount > 0}
        scrollToBottom={virtualizedListRef?.scrollToBottom}
      />
    </Box>
  );
};

export default memo(ChatContentList);
