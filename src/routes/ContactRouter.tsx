import * as React from 'react';
import PageNotFoundRedirect from './PageNotFoundRedirect';
import {RootRoutes} from './RootRouter';
import {Route} from 'react-router-dom';
import ContactsMain from '../pages/contacts/ContactsMain';

export enum ContactRoutes {
  INCOMING = '/incoming',
  OUTCOMING = '/outcoming',
}

export class ContactRouteUtils {
  public static getListUrl = (): string => RootRoutes.CONTACTS;
  public static getOutcomingUrl = (): string => RootRoutes.CONTACTS + ContactRoutes.OUTCOMING;
  public static getIncomingUrl = (): string => RootRoutes.CONTACTS + ContactRoutes.INCOMING;
}

const ContactRouter = () => {
  return (
    <>
      <Route index element={<ContactsMain />} />
      <Route path={RootRoutes.CONTACTS + ContactRoutes.OUTCOMING} element={<ContactsMain />} />
      <Route path={RootRoutes.CONTACTS + ContactRoutes.INCOMING} element={<ContactsMain />} />
      {/*Redirects*/}
      <Route path="*" element={<PageNotFoundRedirect />} />
    </>
  );
};

export default ContactRouter;
