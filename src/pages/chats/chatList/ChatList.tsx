import React, {useCallback, useEffect, useState} from 'react';
import {Chat} from '../../../models/Chat';
import {useAppDispatch, useAppSelector} from '../../../store/store';
import ChatsSelectors from '../../../store/chats/chatsSelectors';
import {useDelayedState} from '../../../shared/hooks/useDelayedState';
import {ChatsActions} from '../../../store/chats/chatsActions';
import ConditionalSpinner from '../../../components/layouts/ConditionalSpinner';
import ChatListControl from './ChatListControl';
import ChatListItem from './ChatListItem';
import {DEFAULT_MARGIN, PAGE_HEADER_HEIGHT} from '../../../constants';
import ChatSelectors from '../../../store/chat/chatSelectors';
import VirtualizedList from '../../../components/layouts/lists/virtualizedList/VirtualizedList';
import PageContent from '../../../components/layouts/PageContent';
import ChatListSkeleton from '../skeletons/ChatListSkeleton';
import ChatListStub from './ChatListStub';

type ControlType = 'regular' | 'filtered';

const ChatList = () => {
  const dispatch = useAppDispatch();
  const chat = useAppSelector(ChatSelectors.chat);
  const chats = useAppSelector(ChatsSelectors.chats);
  const chatsInitialized = useAppSelector(ChatsSelectors.chatsInitialized);
  const filteredChats = useAppSelector(ChatsSelectors.filteredChats);
  const allLoaded = useAppSelector(ChatsSelectors.allLoaded);
  const [type, setType] = useState<ControlType>('regular');
  const [filter, setFilter] = useState<string>('');
  const [loading, setLoading] = useDelayedState(!chatsInitialized);
  const [filterLoading, setFilterLoading] = useDelayedState(false);
  const [filterLoadCounter, setFilterLoadCounter] = useState<number>(0);

  /*
  loaders
   */

  const load = useCallback(async (): Promise<void> => {
    await dispatch(ChatsActions.fetchChatsThunk(chats.length));
  }, [chats.length]);

  const loadFiltered = useCallback(async (): Promise<void> => {
    await dispatch(ChatsActions.fetchFilteredChatsThunk(filter));
  }, [filter]);

  /*
  keyExtractor and renderItem
   */

  const keyExtractor = useCallback(
    (index: number): string => {
      const data = type === 'regular' ? chats : filteredChats;
      return data.length > 0 ? data[index].id : undefined;
    },
    [type, chats, filteredChats],
  );

  const itemRenderer = useCallback(
    (chatItem: Chat) => {
      const isSelected = chat?.id === chatItem.id;
      return (
        <PageContent maxWidth="md">
          <ChatListItem chat={chatItem} isSelected={isSelected} />
        </PageContent>
      );
    },
    [chat],
  );

  /*
  Effects
   */

  useEffect(() => {
    loading && load().finally(() => setLoading(false));
  }, []);

  useEffect(() => {
    const filterNotEmpty = filter?.trim().length > 0;
    setType(filterNotEmpty ? 'filtered' : 'regular');
    if (filterNotEmpty) {
      setFilterLoadCounter((prevState) => prevState + 1);
      loadFiltered().finally(() => setFilterLoadCounter((prevState) => prevState - 1));
    }
  }, [filter]);

  useEffect(() => {
    setFilterLoading(filterLoadCounter > 0);
  }, [filterLoadCounter]);

  return (
    <>
      <ChatListControl setFilter={setFilter} />
      <ConditionalSpinner loading={loading || filterLoading} loadingPlaceholder={<ChatListSkeleton />}>
        {chats.length === 0 && <ChatListStub />}
        {chats.length > 0 && (
          <VirtualizedList
            itemRenderer={itemRenderer}
            keyExtractor={keyExtractor}
            itemData={type === 'regular' ? chats : filteredChats}
            allLoaded={type === 'regular' ? allLoaded : undefined}
            loadMoreItems={type === 'regular' ? load : undefined}
            paddingTop={PAGE_HEADER_HEIGHT + DEFAULT_MARGIN / 2}
          />
        )}
      </ConditionalSpinner>
    </>
  );
};

export default ChatList;
