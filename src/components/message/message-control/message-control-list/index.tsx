import React, {FC, ReactElement, useEffect, useState} from 'react';
import {Box} from '@material-ui/core';
import {messageControlListStyles} from './_styles';
import MessageControlChat from './message-control-chat';
import {Chat} from '../../../../models/chat.model';
import MessageService from '../../../../services/message.service';
import {useSnackContext} from '../../../../shared/contexts/snack-context';
import {User} from '../../../../models/user.model';
import {useWsMessagesContext} from '../../../../shared/contexts/messenger-contexts/ws-messages-context';
import {CircularSpinner} from '../../../common/loaders';
import {handleChatLastMessageEvent, handleChatNewEvent, handleChatUpdateEvent} from './_ws';
import {ArrayUtils} from '../../../../shared/utils/array.utils';
import {VirtualizedList} from '../../../common/surfaces';
import {CHAT_HEIGHT} from '../../_constants';

type Props = {
  chat: Chat;
  setChat: (chat: Chat) => void;
  account: User;
};

const MessageControlList: FC<Props> = ({chat, setChat, account}: Props) => {
  const classes = messageControlListStyles();
  const {chatNewEvent, chatUpdateEvent, chatLastMessageEvent, chatLastMessageUpdateEvent} = useWsMessagesContext();
  const {handleResponse} = useSnackContext();
  const [chats, setChats] = useState<Chat[]>([]);
  const [loading, setLoading] = useState(true);
  const [allChatsLoaded, setAllChatsLoaded] = useState(false);

  const handleOnChatClick = (index: number) => (): void => {
    const chat = chats[index];
    setChat(chat);
  };

  const addLoadedChatsToState = (loadedChats: Chat[]): void => {
    setChats((prevState) => {
      const combinedMessages = [...prevState, ...loadedChats];
      return combinedMessages.filter(ArrayUtils.uniqueByIdFilter);
    });
  };

  const loadMoreChats = (): Promise<void> =>
    new Promise((resolve) => {
      MessageService.getAllChatsPageable(chats.length)
        .then((response) => {
          const newChats = response.data;
          if (newChats.length === 0) {
            setAllChatsLoaded(true);
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

  const isChatLoaded = ({index}): boolean => (index < chats.length ? true : allChatsLoaded);

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

  const chatRenderer = ({index, key, style}: any): ReactElement => (
    <MessageControlChat
      index={index}
      chats={chats}
      account={account}
      isSelected={chat?.id === chats[index].id}
      key={key}
      style={style}
      onClick={handleOnChatClick(index)}
    />
  );

  return loading ? (
    <CircularSpinner size="sm" />
  ) : (
    <Box className={classes.root}>
      <VirtualizedList
        renderer={chatRenderer}
        isRowLoaded={isChatLoaded}
        loadMoreRows={loadMoreChats}
        loadedLength={chats.length}
        totalLength={allChatsLoaded ? chats.length : chats.length + 1}
        rowHeight={CHAT_HEIGHT}
      />
    </Box>
  );
};

export default MessageControlList;
