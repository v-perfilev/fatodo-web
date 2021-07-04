import React, {FC, useCallback, useEffect, useState} from 'react';
import {Chat} from '../../../../models/chat.model';
import {User} from '../../../../models/user.model';
import {useWsChatContext} from '../../../../shared/contexts/chat-contexts/ws-chat-context';
import {useSnackContext} from '../../../../shared/contexts/snack-context';
import {ArrayUtils} from '../../../../shared/utils/array.utils';
import {CircularSpinner} from '../../../../components/loaders';
import ChatControlContainer from '../chat-control-container';
import ChatService from '../../../../services/chat.service';
import {TIMEOUT_BEFORE_APPLY_FILTER} from '../../_constants';

type Props = {
  filter: string;
  chat: Chat;
  setChat: (chat: Chat) => void;
  account: User;
};

const ChatControlFilteredList: FC<Props> = ({filter, chat, setChat, account}: Props) => {
  const {chatUpdateEvent, chatLastMessageEvent, chatLastMessageUpdateEvent} = useWsChatContext();
  const {handleResponse} = useSnackContext();
  const [chats, setChats] = useState<Chat[]>([]);
  const [loading, setLoading] = useState(true);
  let timerId;

  const updateChats = useCallback(
    (updateFunc: (prevState: Chat[]) => Chat[]): void => {
      const combinedChats = updateFunc(chats);
      setChats(combinedChats);
    },
    [chats]
  );

  const chatUpdater = useCallback(
    (chatToUpdate: Chat) => (prevState: Chat[]): Chat[] => {
      if (chat?.id === chatToUpdate.id) {
        setChat(chatToUpdate);
      }
      const chatInList = prevState.find((c) => c.id === chatToUpdate.id);
      if (chatInList) {
        const index = prevState.indexOf(chatInList);
        prevState[index] = chatToUpdate;
      }
      return [...prevState];
    },
    []
  );

  const chatRemover = useCallback(
    (chatToDelete: Chat) => (prevState: Chat[]): Chat[] => {
      if (chat?.id === chatToDelete.id) {
        setChat(null);
      }
      const chatInList = prevState.find((c) => c.id === chatToDelete.id);
      if (chatInList) {
        ArrayUtils.deleteItem(prevState, chatInList);
      }
      return [...prevState];
    },
    []
  );

  const lastMessageUpdater = useCallback(
    (lastMessageChat: Chat) => (prevState: Chat[]): Chat[] => {
      const chatInList = prevState.find((c) => c.id === lastMessageChat.id);
      if (chatInList) {
        ArrayUtils.deleteItem(prevState, chatInList);
      }
      return [...prevState, lastMessageChat];
    },
    []
  );

  const loadFilteredChats = useCallback((filter: string): void => {
    setLoading(true);
    ChatService.getFilteredChats(filter)
      .then((response) => {
        const chats = response.data;
        setChats(chats);
      })
      .catch(handleResponse)
      .finally(() => {
        setLoading(false);
      });
  }, []);

  useEffect(() => {
    window.clearTimeout(timerId);
    if (filter.length > 0) {
      timerId = window.setTimeout(() => loadFilteredChats(filter), TIMEOUT_BEFORE_APPLY_FILTER);
    } else {
      setChats([]);
    }
  }, [filter]);

  useEffect(() => {
    if (chatUpdateEvent) {
      const updateFunc = chatUpdateEvent.members.includes(account.id)
        ? chatUpdater(chatUpdateEvent)
        : chatRemover(chatUpdateEvent);
      updateChats(updateFunc);
    }
  }, [chatUpdateEvent]);

  useEffect(() => {
    if (chatLastMessageEvent) {
      const updateFunc = lastMessageUpdater(chatLastMessageEvent);
      updateChats(updateFunc);
    }
  }, [chatLastMessageEvent]);

  useEffect(() => {
    if (chatLastMessageUpdateEvent) {
      const updateFunc = lastMessageUpdater(chatLastMessageUpdateEvent);
      updateChats(updateFunc);
    }
  }, [chatLastMessageUpdateEvent]);

  return loading ? (
    <CircularSpinner size="sm" />
  ) : (
    <ChatControlContainer chat={chat} setChat={setChat} chats={chats} account={account} />
  );
};

export default ChatControlFilteredList;
