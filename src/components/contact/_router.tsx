import * as React from 'react';
import {FC} from 'react';
import {Redirect, Switch, useRouteMatch} from 'react-router-dom';
import PublicRoute from '../../shared/routes/public-route';
import {compose} from 'recompose';
import withFlexibleHeader from '../../shared/hoc/with-flexible-header';
import withAdditionalMenu from '../../shared/hoc/with-additional-menu';
import {Routes} from '../router';
import withItemDeleteDialog from '../../shared/hoc/with-item-delete-dialog';
import withGroupDeleteDialog from '../../shared/hoc/with-group-delete-dialog';
import ContactList from './contact-list';
import ContactIncoming from './contact-incoming';
import ContactOutcoming from './contact-outcoming';

export enum ContactRoutes {
  INCOMING = '/incoming',
  OUTCOMING = '/outcoming',
}

export class ContactRouteUtils {}

const ContactRouter: FC = () => {
  const match = useRouteMatch();

  return (
    <Switch>
      <PublicRoute exact path={match.path} component={ContactList} />
      <PublicRoute path={match.path + ContactRoutes.INCOMING} component={ContactIncoming} />
      <PublicRoute path={match.path + ContactRoutes.OUTCOMING} component={ContactOutcoming} />
      <Redirect to={Routes.PAGE_NOT_FOUND} />
    </Switch>
  );
};

export default compose(
  withFlexibleHeader,
  withAdditionalMenu,
  withGroupDeleteDialog,
  withItemDeleteDialog
)(ContactRouter);
