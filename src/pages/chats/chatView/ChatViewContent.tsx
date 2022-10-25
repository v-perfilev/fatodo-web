import React from 'React';
import {SxProps} from '@mui/material';
import {CHAT_FOOTER_HEIGHT, CHAT_HEADER_HEIGHT} from '../../../constants';
import ChatSelectors from '../../../store/chat/chatSelectors';
import {useAppDispatch, useAppSelector} from '../../../store/store';
import {useCallback, useMemo, useRef, useState} from 'react';
import PageContent from '../../../components/layouts/PageContent';
import ChatViewItem from './ChatViewItem';
import {ChatActions} from '../../../store/chat/chatActions';
import FBox from '../../../components/boxes/FBox';
import VirtualizedList, {
  VirtualizedListMethods,
} from '../../../components/layouts/lists/virtualizedList/VirtualizedList';
import {ChatItem} from '../../../models/Message';
import ScrollCornerButton from '../../../components/surfaces/ScrollCornerButton';
import ChatsSelectors from '../../../store/chats/chatsSelectors';

type ChatViewContentProps = {};

const ChatViewContent = ({}: ChatViewContentProps) => {
  const unreadMessageIdsSelector = useCallback(ChatsSelectors.makeUnreadMessageIdsSelector(), []);
  const dispatch = useAppDispatch();
  const chat = useAppSelector(ChatSelectors.chat);
  const messages = useAppSelector(ChatSelectors.messages);
  const chatItems = useAppSelector(ChatSelectors.chatItems);
  const allLoaded = useAppSelector(ChatSelectors.allLoaded);
  const unreadMessageIds = useAppSelector((state) => unreadMessageIdsSelector(state, chat.id));
  const [hideScrollButton, setHideScrollButton] = useState<boolean>(true);
  const listRef = useRef<VirtualizedListMethods>();

  const scrollButtonHighlighted = useMemo<boolean>(() => {
    return unreadMessageIds.length > 0;
  }, [unreadMessageIds]);

  /*
  loaders
   */

  const load = useCallback(async (): Promise<void> => {
    if (chat) {
      await dispatch(ChatActions.fetchMessagesThunk({chatId: chat.id, offset: messages.length}));
    }
  }, [chat?.id, chatItems.length]);

  /*
  keyExtractor and renderItem
   */

  const keyExtractor = useCallback(
    (index: number): string => {
      const item = chatItems[index];
      return item.date || item.message?.id || item.message?.createdAt.toString();
    },
    [chatItems],
  );

  const itemRenderer = useCallback((item: ChatItem) => {
    return (
      <PageContent maxWidth="md">
        <ChatViewItem item={item} />
      </PageContent>
    );
  }, []);

  /*
  scroll up button
   */

  const scrollUp = (): void => listRef.current.scrollToBottom();

  return (
    <FBox sx={containerStyles}>
      <VirtualizedList
        itemRenderer={itemRenderer}
        keyExtractor={keyExtractor}
        itemData={chatItems}
        allLoaded={allLoaded}
        loadMoreItems={load}
        reverseOrder
        setIsOnBottom={setHideScrollButton}
        virtualizedListRef={listRef}
      />
      <ScrollCornerButton show={!hideScrollButton} action={scrollUp} down highlighted={scrollButtonHighlighted} />
    </FBox>
  );
};

const containerStyles: SxProps = {
  width: '100%',
  height: `calc(100% - ${CHAT_HEADER_HEIGHT}px - ${CHAT_FOOTER_HEIGHT}px)`,
};

export default ChatViewContent;
