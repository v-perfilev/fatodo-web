import React, {useCallback, useEffect, useMemo, useRef, useState} from 'react';
import {
  DEFAULT_MARGIN,
  HEADER_HEIGHT,
  PAGE_FOOTER_HEIGHT,
  PAGE_HEADER_HEIGHT,
  TIMEOUT_BEFORE_MARK_AS_READ,
} from '../../../constants';
import ChatSelectors from '../../../store/chat/chatSelectors';
import {useAppDispatch, useAppSelector} from '../../../store/store';
import PageContent from '../../../components/layouts/PageContent';
import ChatViewItem from './ChatViewItem';
import {ChatActions} from '../../../store/chat/chatActions';
import VirtualizedList, {
  VirtualizedListMethods,
} from '../../../components/layouts/lists/virtualizedList/VirtualizedList';
import {ChatItem, Message} from '../../../models/Message';
import ScrollCornerButton from '../../../components/surfaces/ScrollCornerButton';
import ChatsSelectors from '../../../store/chats/chatsSelectors';
import AuthSelectors from '../../../store/auth/authSelectors';
import {ChatUtils} from '../../../shared/utils/ChatUtils';
import {Container, SxProps} from '@mui/material';
import FBox from '../../../components/boxes/FBox';
import ChatViewStub from './ChatViewStub';

const ChatViewContent = () => {
  const unreadMessageIdsSelector = useCallback(ChatsSelectors.makeUnreadMessageIdsSelector(), []);
  const dispatch = useAppDispatch();
  const account = useAppSelector(AuthSelectors.account);
  const chat = useAppSelector(ChatSelectors.chat);
  const messages = useAppSelector(ChatSelectors.messages);
  const chatItems = useAppSelector(ChatSelectors.chatItems);
  const allLoaded = useAppSelector(ChatSelectors.allLoaded);
  const unreadMessageIds = useAppSelector((state) => unreadMessageIdsSelector(state, chat.id));
  const [visibleItems, setVisibleItems] = useState<number[]>([]);
  const [hideScrollButton, setHideScrollButton] = useState<boolean>(true);
  const listRef = useRef<VirtualizedListMethods>();
  const unreadTimersRef = useRef<Map<string, any>>(new Map());

  const scrollButtonHighlighted = useMemo<boolean>(() => {
    return unreadMessageIds.length > 0;
  }, [unreadMessageIds]);

  /*
  loaders
   */

  const load = useCallback(async (): Promise<void> => {
    await dispatch(ChatActions.fetchMessagesThunk({chatId: chat.id, offset: messages.length}));
  }, [chat.id, chatItems.length]);

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
 mark as read
  */

  const addTimer = useCallback(
    (message: Message): void => {
      const timerId = setTimeout(() => {
        dispatch(ChatActions.markMessageAsReadThunk(message));
        unreadTimersRef.current.delete(message.id);
      }, TIMEOUT_BEFORE_MARK_AS_READ);
      unreadTimersRef.current.set(message.id, timerId);
    },
    [chat.id, account, unreadTimersRef.current],
  );

  const deleteTimer = useCallback(
    (messageId: string): void => {
      const timerId = unreadTimersRef.current.get(messageId);
      clearInterval(timerId);
      unreadTimersRef.current.delete(messageId);
    },
    [unreadTimersRef.current],
  );

  useEffect((): void => {
    const unreadMessages = ChatUtils.getUnreadMessages(chatItems, account, visibleItems);
    const unreadIds = unreadMessages.map((m) => m.id);
    const timerIds = Array.from(unreadTimersRef.current.keys());
    const messagesToAdd = unreadMessages.filter((m) => !timerIds.includes(m.id));
    const idsToDelete = timerIds.filter((id) => !unreadIds.includes(id));
    messagesToAdd.forEach((m) => addTimer(m));
    idsToDelete.forEach((id) => deleteTimer(id));
  }, [account, unreadTimersRef.current, addTimer, deleteTimer, visibleItems]);

  /*
  scroll up button
   */

  const scrollUp = (): void => listRef.current.scrollToBottom();

  return (
    <>
      {messages.length === 0 && <ChatViewStub />}
      {messages.length > 0 && (
        <>
          <VirtualizedList
            itemRenderer={itemRenderer}
            keyExtractor={keyExtractor}
            itemData={chatItems}
            allLoaded={allLoaded}
            loadMoreItems={load}
            reverseOrder
            paddingTop={PAGE_HEADER_HEIGHT + DEFAULT_MARGIN}
            paddingBottom={PAGE_FOOTER_HEIGHT + DEFAULT_MARGIN}
            setIsOnBottom={setHideScrollButton}
            setVisibleItems={setVisibleItems}
            virtualizedListRef={listRef}
          />
          <Container sx={containerStyles}>
            <FBox sx={boxStyles}>
              <ScrollCornerButton
                show={!hideScrollButton}
                action={scrollUp}
                down
                highlighted={scrollButtonHighlighted}
                bottomPadding={PAGE_FOOTER_HEIGHT}
              />
            </FBox>
          </Container>
        </>
      )}
    </>
  );
};

const containerStyles: SxProps = {
  marginTop: `calc(100vh - ${HEADER_HEIGHT}px)`,
};

const boxStyles: SxProps = {
  position: 'relative',
};

export default ChatViewContent;
