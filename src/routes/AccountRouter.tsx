import React from 'react';
import {RootRoutes} from './RootRouter';
import {Route} from 'react-router-dom';
import PageNotFoundRedirect from './PageNotFoundRedirect';
import AccountSettings from '../pages/account/accountSettings/AccountSettings';

export enum AccountRoutes {
  SETTINGS = '/',
}

export class AccountRouteUtils {
  public static getSettingsUrl = (): string => RootRoutes.ACCOUNT;
}

const AccountRouter = () => {
  return (
    <>
      <Route index element={<AccountSettings />} />
      {/*Redirects*/}
      <Route path="*" element={<PageNotFoundRedirect />} />
    </>
  );
};

export default AccountRouter;
