import * as React from 'react';
import {FC} from 'react';
import {Redirect, Switch, useRouteMatch} from 'react-router-dom';
import PublicRoute from '../../shared/routes/public-route';
import withFlexibleHeader from '../../shared/hocs/with-header/with-flexible-header';
import {Routes} from '../router';
import ContactMain from './contact-main';
import withUserList from '../../shared/hocs/with-list/with-user-list';
import withContactDialogs from '../../shared/hocs/with-dialogs/with-contact-dialogs';
import {flowRight} from 'lodash';

export enum ContactRoutes {
  INCOMING = '/incoming',
  OUTCOMING = '/outcoming',
}

export class ContactRouteUtils {
  public static getListUrl = (): string => Routes.CONTACTS;
  public static getOutcomingUrl = (): string => Routes.CONTACTS + ContactRoutes.OUTCOMING;
  public static getIncomingUrl = (): string => Routes.CONTACTS + ContactRoutes.INCOMING;
}

const ContactRouter: FC = () => {
  const match = useRouteMatch();

  return (
    <Switch>
      <PublicRoute exact path={match.path} component={ContactMain} />
      <PublicRoute path={match.path + ContactRoutes.OUTCOMING} component={ContactMain} />
      <PublicRoute path={match.path + ContactRoutes.INCOMING} component={ContactMain} />
      <Redirect to={Routes.PAGE_NOT_FOUND} />
    </Switch>
  );
};

export default flowRight([withFlexibleHeader, withUserList, withContactDialogs])(ContactRouter);
