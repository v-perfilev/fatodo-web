import * as React from 'react';
import {FC} from 'react';
import {Redirect, Switch, useRouteMatch} from 'react-router-dom';
import PublicRoute from '../../shared/routes/public-route';
import withFlexibleHeader from '../../shared/hocs/with-header/with-flexible-header';
import {Routes} from '../router';
import MessageMain from './chat-main/chat-main';
import withUserList from '../../shared/hocs/with-list/with-user-list';
import {flowRight} from 'lodash';

export enum ChatRoutes {
  CHAT = '/:chatId',
}

export class ChatRouteUtils {
  public static getRootUrl = (): string => Routes.CHATS;
  public static getChatUrl = (id: string): string => (Routes.CHATS + ChatRoutes.CHAT).replace(':chatId', id);
}

const ChatRouter: FC = () => {
  const match = useRouteMatch();

  return (
    <Switch>
      <PublicRoute exact path={match.path} component={MessageMain} />
      <PublicRoute exact path={match.path + ChatRoutes.CHAT} component={MessageMain} />
      <Redirect to={Routes.PAGE_NOT_FOUND} />
    </Switch>
  );
};

export default flowRight([withFlexibleHeader, withUserList])(ChatRouter);
