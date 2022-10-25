import React from 'React';
import {Chat} from '../../../models/Chat';
import {useAppDispatch, useAppSelector} from '../../../store/store';
import ChatsSelectors from '../../../store/chats/chatsSelectors';
import {useCallback, useEffect, useState} from 'react';
import {useDelayedState} from '../../../shared/hooks/useDelayedState';
import {ChatsActions} from '../../../store/chats/chatsActions';
import ConditionalSpinner from '../../../components/layouts/ConditionalSpinner';
import ChatListControl from './ChatListControl';
import ChatListItem from './ChatListItem';
import FBox from '../../../components/boxes/FBox';
import {SxProps} from '@mui/material';
import {CHATS_FILTER_HEIGHT} from '../../../constants';
import ChatSelectors from '../../../store/chat/chatSelectors';
import VirtualizedList from '../../../components/layouts/lists/virtualizedList/VirtualizedList';

type ControlType = 'regular' | 'filtered';

const ChatList = () => {
  const dispatch = useAppDispatch();
  // const {showChatCreateDialog} = useChatDialogContext();
  const chat = useAppSelector(ChatSelectors.chat);
  const chats = useAppSelector(ChatsSelectors.chats);
  const allLoaded = useAppSelector(ChatsSelectors.allLoaded);
  const filteredChats = useAppSelector(ChatsSelectors.filteredChats);
  const [type, setType] = useState<ControlType>('regular');
  const [filter, setFilter] = useState<string>('');
  const [loading, setLoading] = useDelayedState(!chats.length);
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
      return <ChatListItem chat={chatItem} isSelected={isSelected} />;
    },
    [chat],
  );

  /*
  Effects
   */

  useEffect(() => {
    loading && !chats.length && load().finally(() => setLoading(false));
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
      <FBox sx={listStyles}>
        <ConditionalSpinner loading={loading || filterLoading}>
          <VirtualizedList
            itemRenderer={itemRenderer}
            keyExtractor={keyExtractor}
            itemData={type === 'regular' ? chats : filteredChats}
            allLoaded={type === 'regular' ? allLoaded : undefined}
            loadMoreItems={type === 'regular' ? load : undefined}
          />
        </ConditionalSpinner>
      </FBox>
    </>
  );
};

const listStyles: SxProps = {
  width: '100%',
  height: `calc(100% - ${CHATS_FILTER_HEIGHT}px)`,
};

export default ChatList;
