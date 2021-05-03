import React, {FC, memo, ReactElement, useCallback, useEffect, useMemo, useState} from 'react';
import {Box} from '@material-ui/core';
import {chatControlListStyles} from './_styles';
import {Chat} from '../../../../models/chat.model';
import ChatService from '../../../../services/chat.service';
import {useSnackContext} from '../../../../shared/contexts/snack-context';
import {User} from '../../../../models/user.model';
import {useWsChatContext} from '../../../../shared/contexts/chat-contexts/ws-chat-context';
import {CircularSpinner} from '../../../common/loaders';
import {handleChatLastMessageEvent, handleChatNewEvent, handleChatUpdateEvent} from './_ws';
import {ArrayUtils} from '../../../../shared/utils/array.utils';
import {CHAT_HEIGHT} from '../../_constants';
import VirtualizedList from '../../../common/surfaces/virtualized-list';
import {ChatControlItemDataProps, ChatControlItemProps} from './types';
import ChatControlRenderer from './chat-control-renderer';

type Props = {
  chat: Chat;
  setChat: (chat: Chat) => void;
  account: User;
};

const ChatControlList: FC<Props> = ({chat, setChat, account}: Props) => {
  const classes = chatControlListStyles();
  const {chatNewEvent, chatUpdateEvent, chatLastMessageEvent, chatLastMessageUpdateEvent} = useWsChatContext();
  const {handleResponse} = useSnackContext();
  const [chats, setChats] = useState<Chat[]>([]);
  const [loading, setLoading] = useState(true);
  const [allLoaded, setAllLoaded] = useState(false);

  const handleOnChatClick = useCallback(
    (index: number) => (): void => {
      const chat = chats[index];
      setChat(chat);
    },
    [chats]
  );

  const addLoadedChatsToState = useCallback(
    (loadedChats: Chat[]): void => {
      setChats((prevState) => {
        const combinedMessages = [...prevState, ...loadedChats];
        return combinedMessages.filter(ArrayUtils.uniqueByIdFilter);
      });
    },
    [setChats]
  );

  const loadMoreChats = useCallback((): Promise<void> => {
    return new Promise((resolve) => {
      ChatService.getAllChatsPageable(chats.length)
        .then((response) => {
          const newChats = response.data;
          if (newChats.length === 0) {
            setAllLoaded(true);
          } else {
            addLoadedChatsToState(newChats);
          }
        })
        .catch((response) => {
          handleResponse(response);
        })
        .finally(() => {
          setLoading(false);
          resolve();
        });
    });
  }, [chats, addLoadedChatsToState]);

  useEffect(() => {
    loadMoreChats().finally();
  }, []);

  useEffect(() => {
    handleChatNewEvent(chatNewEvent, setChats);
  }, [chatNewEvent]);

  useEffect(() => {
    handleChatUpdateEvent(chatUpdateEvent, setChats, chat, setChat, account);
  }, [chatUpdateEvent]);

  useEffect(() => {
    handleChatLastMessageEvent(chatLastMessageEvent, setChats);
  }, [chatLastMessageEvent]);

  useEffect(() => {
    handleChatLastMessageEvent(chatLastMessageUpdateEvent, setChats);
  }, [chatLastMessageUpdateEvent]);

  const chatRenderer = useCallback(
    (props: ChatControlItemProps): ReactElement => <ChatControlRenderer {...props} />,
    []
  );

  const itemData = useMemo<ChatControlItemDataProps>(
    () => ({
      items: chats,
      chat,
      account,
      handleOnChatClick,
    }),
    [chats, chat, account, handleOnChatClick]
  );

  return loading ? (
    <CircularSpinner size="sm" />
  ) : (
    <Box className={classes.root}>
      <VirtualizedList
        itemRenderer={chatRenderer}
        itemData={itemData}
        loadMoreItems={loadMoreChats}
        loadedLength={chats.length}
        allLoaded={allLoaded}
        itemHeight={CHAT_HEIGHT}
      />
    </Box>
  );
};

export default memo(ChatControlList);
