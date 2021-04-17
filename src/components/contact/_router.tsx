import * as React from 'react';
import {FC} from 'react';
import {Redirect, Switch, useRouteMatch} from 'react-router-dom';
import PublicRoute from '../../shared/routes/public-route';
import {compose} from 'recompose';
import withFlexibleHeader from '../../shared/hocs/with-header/with-flexible-header';
import withAdditionalMenu from '../../shared/hocs/with-additional-menu/with-additional-menu';
import {Routes} from '../router';
import ContactMain from './contact-main';

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

export default compose<{}, {}>(withFlexibleHeader, withAdditionalMenu)(ContactRouter);
