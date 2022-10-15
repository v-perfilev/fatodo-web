import React from 'react';
import {RootRoutes} from './RootRouter';
import {Route} from 'react-router-dom';
import PageNotFoundRedirect from './PageNotFoundRedirect';
import ChatList from '../pages/chats/chatList/ChatList';
import ChatView from '../pages/chats/chatView/ChatView';

export enum ChatRoutes {
  CHAT = '/:chatId',
}

export class ChatRouteUtils {
  public static getRootUrl = (): string => RootRoutes.CHATS;
  public static getChatUrl = (id: string): string => (RootRoutes.CHATS + ChatRoutes.CHAT).replace(':chatId', id);
}

const ChatRouter = () => {
  return (
    <>
      <Route index element={<ChatList />} />
      <Route path={RootRoutes.CHATS + ChatRoutes.CHAT} element={<ChatView />} />
      {/*Redirects*/}
      <Route path="*" element={<PageNotFoundRedirect />} />
    </>
  );
};

export default ChatRouter;
