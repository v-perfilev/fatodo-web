import * as React from 'react';
import {FC, useEffect} from 'react';
import {Redirect, Switch, useRouteMatch} from 'react-router-dom';
import PublicRoute from '../../shared/routes/public-route';
import {compose} from 'recompose';
import withFlexibleHeader from '../../shared/hocs/with-header/with-flexible-header';
import withAdditionalMenu from '../../shared/hocs/with-additional-menu/with-additional-menu';
import {Routes} from '../router';
import ContactMain from './contact-main';
import {useDialogsContext} from '../../shared/contexts/dialogs-context';
import ContactRequestDialog, {defaultContactRequestDialogProps} from './dialogs/contact-request-dialog';
import withUserList from '../../shared/hocs/with-list/with-user-list';

export enum ContactDialogs {
  REQUEST = 'CONTACT_REQUEST_DIALOG',
}

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
  const {handleDialog} = useDialogsContext();
  const match = useRouteMatch();

  const initDialogs = (): void => {
    handleDialog(ContactDialogs.REQUEST, ContactRequestDialog, defaultContactRequestDialogProps);
  };

  useEffect(() => {
    initDialogs();
  }, []);

  return (
    <Switch>
      <PublicRoute exact path={match.path} component={ContactMain} />
      <PublicRoute path={match.path + ContactRoutes.OUTCOMING} component={ContactMain} />
      <PublicRoute path={match.path + ContactRoutes.INCOMING} component={ContactMain} />
      <Redirect to={Routes.PAGE_NOT_FOUND} />
    </Switch>
  );
};

export default compose(withFlexibleHeader, withAdditionalMenu, withUserList)(ContactRouter);
