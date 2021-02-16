import * as React from 'react';
import {FC} from 'react';
import {Redirect, Switch, useRouteMatch} from 'react-router-dom';
import PublicRoute from '../../shared/routes/public-route';
import {compose} from 'recompose';
import withFlexibleHeader from '../../shared/hocs/with-header/with-flexible-header';
import withAdditionalMenu from '../../shared/hocs/with-additional-menu/with-additional-menu';
import {Routes} from '../router';
import MessageMain from './message-main';

export enum MessageRoutes {
  CHAT = '/:chatId',
}

const MessageRouter: FC = () => {
  const match = useRouteMatch();

  return (
    <Switch>
      <PublicRoute exact path={match.path} component={MessageMain} />
      <PublicRoute exact path={match.path + MessageRoutes.CHAT} component={MessageMain} />
      <Redirect to={Routes.PAGE_NOT_FOUND} />
    </Switch>
  );
};

export default compose(withFlexibleHeader, withAdditionalMenu)(MessageRouter);
