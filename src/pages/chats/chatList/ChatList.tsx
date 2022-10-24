import React from 'React';
import {Chat} from '../../../models/Chat';
import {UserAccount} from '../../../models/User';
import VirtualizedList from '../../../components/layouts/lists/VirtualizedList';
import {useAppDispatch, useAppSelector} from '../../../store/store';
import ChatsSelectors from '../../../store/chats/chatsSelectors';
import {useCallback, useEffect, useState} from 'react';
import {useDelayedState} from '../../../shared/hooks/useDelayedState';
import {ChatsActions} from '../../../store/chats/chatsActions';
import {ListChildComponentProps} from 'react-window';
import ConditionalSpinner from '../../../components/layouts/ConditionalSpinner';
import ChatListControl from './ChatListControl';
import ChatListItem from './ChatListItem';
import FBox from '../../../components/boxes/FBox';
import {SxProps} from '@mui/material';
import {CHATS_FILTER_HEIGHT} from '../../../constants';

type ChatListProps = {
  chat: Chat;
  setChat: (chat: Chat) => void;
  account: UserAccount;
};

type ControlType = 'regular' | 'filtered';

const ChatList = ({chat, setChat, account}: ChatListProps) => {
  const dispatch = useAppDispatch();
  // const {showChatCreateDialog} = useChatDialogContext();
  const chats = useAppSelector(ChatsSelectors.chats);
  const filteredChats = useAppSelector(ChatsSelectors.filteredChats);
  const [type, setType] = useState<ControlType>('regular');
  const [filter, setFilter] = useState<string>('');
  const [loading, setLoading] = useDelayedState();
  const [filterLoading, setFilterLoading] = useDelayedState();
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
    ({data, index}: ListChildComponentProps<Chat[]>) => {
      const isSelected = chat?.id === data[index].id;
      return <ChatListItem chat={data[index]} selectChat={setChat} isSelected={isSelected} />;
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
      <FBox sx={containerStyles}>
        <ConditionalSpinner loading={loading || filterLoading}>
          <VirtualizedList
            itemRenderer={itemRenderer}
            keyExtractor={keyExtractor}
            data={type === 'regular' ? chats : filteredChats}
            dataCount={type === 'regular' ? chats.length : filteredChats.length}
            loadMoreItems={type === 'regular' ? load : loadFiltered}
          />
        </ConditionalSpinner>
      </FBox>
    </>
  );
};

const containerStyles: SxProps = {
  width: '100%',
  height: `calc(100% - ${CHATS_FILTER_HEIGHT}px)`,
};

export default ChatList;
