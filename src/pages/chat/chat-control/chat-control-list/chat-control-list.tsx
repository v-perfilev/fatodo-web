import React, {FC, useCallback, useEffect, useState} from 'react';
import {Chat} from '../../../../models/chat.model';
import ChatService from '../../../../services/chat.service';
import {useSnackContext} from '../../../../shared/contexts/snack-context';
import {User} from '../../../../models/user.model';
import {useWsChatContext} from '../../../../shared/contexts/chat-contexts/ws-chat-context';
import {CircularSpinner} from '../../../../components/loaders';
import {ArrayUtils} from '../../../../shared/utils/array.utils';
import ChatControlContainer from './chat-control-list-container';
import ChatControlStub from '../chat-control-stub';

type Props = {
  chat: Chat;
  setChat: (chat: Chat) => void;
  account: User;
};

const ChatControlList: FC<Props> = ({chat, setChat, account}: Props) => {
  const {chatNewEvent, chatUpdateEvent, chatLastMessageEvent, chatLastMessageUpdateEvent} = useWsChatContext();
  const {handleResponse} = useSnackContext();
  const [chats, setChats] = useState<Chat[]>([]);
  const [loading, setLoading] = useState(true);
  const [allLoaded, setAllLoaded] = useState(false);

  // UPDATERS

  const updateChats = useCallback(
    (updateFunc: (prevState: Chat[]) => Chat[]): void => {
      const combinedChats = updateFunc(chats);
      setChats(combinedChats);
    },
    [chats]
  );

  const chatInserter = useCallback(
    (...chats: Chat[]) => (prevState: Chat[]): Chat[] => {
      const combinedChats = [...chats, ...prevState];
      return combinedChats.filter(ArrayUtils.uniqueByIdFilter);
    },
    []
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
      const sortedChats = [lastMessageChat, ...prevState].sort((chatA, chatB) => {
        return chatA.lastMessage?.createdAt < chatB.lastMessage?.createdAt ? 1 : 0;
      });
      return [...sortedChats];
    },
    []
  );

  // LOADERS

  const loadMoreChats = useCallback((): Promise<void> => {
    return new Promise((resolve) => {
      ChatService.getAllChatsPageable(chats.length)
        .then((response) => {
          const newChats = response.data;
          if (newChats.length === 0) {
            setAllLoaded(true);
          } else {
            const updateFunc = chatInserter(...newChats);
            updateChats(updateFunc);
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
  }, [chats]);

  // EFFECTS

  useEffect(() => {
    loadMoreChats().finally();
  }, []);

  useEffect(() => {
    if (chatNewEvent) {
      const updateFunc = chatInserter(chatNewEvent);
      updateChats(updateFunc);
    }
  }, [chatNewEvent]);

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

  // RENDERERS

  return (
    <>
      {loading && <CircularSpinner size="sm" />}
      {!loading && chats.length === 0 && <ChatControlStub />}
      {!loading && chats.length > 0 && (
        <ChatControlContainer
          chat={chat}
          setChat={setChat}
          chats={chats}
          loadMoreItems={loadMoreChats}
          allLoaded={allLoaded}
          account={account}
        />
      )}
    </>
  );
};

export default ChatControlList;
