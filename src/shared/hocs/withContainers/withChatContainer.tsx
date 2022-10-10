import React, {ComponentType, useEffect} from 'react';
import {useAppDispatch, useAppSelector} from '../../../store/store';
import {useDelayedState} from '../../hooks/useDelayedState';
import ChatSelectors from '../../../store/chat/chatSelectors';
import {ChatActions} from '../../../store/chat/chatActions';
import {Chat} from '../../../models/Chat';

export type WithChatProps = {
  chat?: Chat;
  loading: boolean;
};

const withChatContainer = (Component: ComponentType<WithChatProps>) => (props: any) => {
  const dispatch = useAppDispatch();
  const [loading, setLoading] = useDelayedState();
  // TODO read params from route
  const route = {params: {chat: undefined as Chat, chatId: 'todo'}};
  const routeChat = route.params.chat;
  const routeChatId = route.params.chatId;
  const chat = useAppSelector(ChatSelectors.chat);

  const goBack = (): void => {
    // TODO go back
  };

  const selectChat = (): void => {
    dispatch(ChatActions.selectChatThunk(routeChat))
      .unwrap()
      .then(() => setLoading(false));
  };

  const loadChat = (): void => {
    dispatch(ChatActions.fetchChatThunk(routeChatId))
      .unwrap()
      .catch(() => goBack())
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    if (routeChat && routeChat.id !== chat?.id) {
      selectChat();
    } else if (routeChatId && routeChatId !== chat?.id) {
      loadChat();
    } else if (!routeChat && !routeChatId) {
      goBack();
    } else {
      setLoading(false);
    }
  }, []);

  return <Component loading={loading} chat={chat || routeChat} {...props} />;
};

export default withChatContainer;
