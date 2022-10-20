import React, {ComponentType, useEffect} from 'react';
import {useAppDispatch, useAppSelector} from '../../../store/store';
import ChatSelectors from '../../../store/chat/chatSelectors';
import {ChatActions} from '../../../store/chat/chatActions';
import {Chat} from '../../../models/Chat';
import {useNavigate, useParams} from 'react-router-dom';

export type WithChatProps = {
  chat?: Chat;
  loading: boolean;
};

const withChatContainer = (Component: ComponentType<WithChatProps>) => (props: any) => {
  const dispatch = useAppDispatch();
  const chat = useAppSelector(ChatSelectors.chat);
  const {chatId} = useParams();
  const navigate = useNavigate();

  const canLoad = chatId !== chat?.id;
  const wrongRoute = !chatId;
  const loadingFinished = chatId === chat?.id;

  const goBack = (): void => navigate(-1);

  const loadChat = (): void => {
    dispatch(ChatActions.fetchChatThunk(chatId))
      .unwrap()
      .catch(() => goBack());
  };

  useEffect(() => {
    if (canLoad) {
      loadChat();
    } else if (wrongRoute) {
      goBack();
    }
  }, []);

  return <Component loading={!loadingFinished} chat={chat} {...props} />;
};

export default withChatContainer;
