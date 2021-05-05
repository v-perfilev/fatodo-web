import * as React from 'react';
import {FC} from 'react';
import {Redirect, Switch, useRouteMatch} from 'react-router-dom';
import PublicRoute from '../../shared/routes/public-route';
import {compose} from 'recompose';
import withFlexibleHeader from '../../shared/hocs/with-header/with-flexible-header';
import withAdditionalMenu from '../../shared/hocs/with-additional-menu/with-additional-menu';
import {Routes} from '../router';
import MessageMain from './chat-main';
import withUserList from '../../shared/hocs/with-list/with-user-list';
import withChatDialogs from '../../shared/hocs/with-dialogs/with-chat-dialogs';

export enum ChatRoutes {
  CHAT = '/:chatId',
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

export default compose(withFlexibleHeader, withAdditionalMenu, withUserList, withChatDialogs)(ChatRouter);
