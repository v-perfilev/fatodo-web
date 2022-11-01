import React from 'react';
import {RootRoutes} from './RootRouter';
import {Route} from 'react-router-dom';
import PageNotFoundRedirect from './PageNotFoundRedirect';
import ChatMain from '../pages/chats/ChatMain';

export enum ChatRoutes {
  CHAT = '/:chatId',
}

export class ChatRouteUtils {
  public static getListUrl = (): string => RootRoutes.CHATS;
  public static getChatUrl = (id: string): string => (RootRoutes.CHATS + ChatRoutes.CHAT).replace(':chatId', id);
}

const ChatRouter = () => {
  return (
    <>
      <Route index element={<ChatMain />} />
      <Route path={RootRoutes.CHATS + ChatRoutes.CHAT} element={<ChatMain />} />
      {/*Redirects*/}
      <Route path="*" element={<PageNotFoundRedirect />} />
    </>
  );
};

export default ChatRouter;
