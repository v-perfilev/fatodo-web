import * as React from 'react';
import {ComponentType, FC, PropsWithChildren, ReactElement, useEffect, useState} from 'react';
import withAuthState from '../with-auth-state/with-auth-state';
import {AuthState} from '../../../store/rerducers/auth.reducer';
import {UnreadMessagesContext} from '../../contexts/chat-contexts/unread-messages-context';
import ChatService from '../../../services/chat.service';
import {useWsChatContext} from '../../contexts/chat-contexts/ws-chat-context';
import {useSnackContext} from '../../contexts/snack-context';
import {handleChatLastMessageEvent, handleMessageStatusesEvent} from './_ws';
import {flowRight} from 'lodash';

type BaseProps = PropsWithChildren<HTMLElement>;

type Props = AuthState & BaseProps;

const withUnreadMessages = (Component: ComponentType): FC => (props: Props): ReactElement => {
  const {account, isAuthenticated} = props;
  const {chatLastMessageEvent, messageStatusesEvent} = useWsChatContext();
  const {handleResponse} = useSnackContext();
  const [totalUnreadMessages, setTotalUnreadMessages] = useState<number>(0);
  const [unreadMessageCountMap, setUnreadMessageCountMap] = useState<Map<string, number>>();
  const [unreadMessageMap, setUnreadMessageMap] = useState<Map<string, string[]>>();

  const updateUnreadMessageMap = (): void => {
    ChatService.getUnreadMessagesMap()
      .then((response) => {
        const map = new Map(Object.entries(response.data));
        setUnreadMessageMap(map);
      })
      .catch((response) => {
        handleResponse(response);
      });
  };

  const updateTotalUnreadMessages = (): void => {
    const chats = [...unreadMessageMap.values()];
    const total = chats.map((messageIds) => messageIds.length).reduce((a, c) => a + c, 0);
    setTotalUnreadMessages(total);
  };

  const updateUnreadMessageCountMap = (): void => {
    const chatIds = [...unreadMessageMap.keys()];
    const countMap = chatIds.reduce((map, chatId) => {
      const messageCount = unreadMessageMap.get(chatId).length;
      map.set(chatId, messageCount);
      return map;
    }, new Map<string, number>());
    setUnreadMessageCountMap(countMap);
  };

  const context = {totalUnreadMessages, unreadMessageCountMap};

  useEffect(() => {
    if (isAuthenticated) {
      updateUnreadMessageMap();
    }
  }, [isAuthenticated]);

  useEffect(() => {
    if (unreadMessageMap) {
      updateTotalUnreadMessages();
      updateUnreadMessageCountMap();
    }
  }, [unreadMessageMap]);

  useEffect(() => {
    if (chatLastMessageEvent) {
      handleChatLastMessageEvent(chatLastMessageEvent, account, setUnreadMessageMap);
    }
  }, [chatLastMessageEvent]);

  useEffect(() => {
    if (messageStatusesEvent) {
      handleMessageStatusesEvent(messageStatusesEvent, account, unreadMessageMap, setUnreadMessageMap);
    }
  }, [messageStatusesEvent]);

  return (
    <UnreadMessagesContext.Provider value={context}>
      <Component {...props} />
    </UnreadMessagesContext.Provider>
  );
};

export default flowRight([withAuthState, withUnreadMessages]);
