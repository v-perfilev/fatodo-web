import React from 'react';
import {RootRoutes} from './RootRouter';
import {Route} from 'react-router-dom';
import PageNotFoundRedirect from './PageNotFoundRedirect';
import AccountSettings from '../pages/account/accountSettings/AccountSettings';
import AccountMain from '../pages/account/accountMain/AccountMain';
import AccountChangePassword from '../pages/account/accountChangePassword/AccountChangePassword';

export enum AccountRoutes {
  SETTINGS = '/settings',
  CHANGE_PASSWORD = '/change-password',
}

export class AccountRouteUtils {
  public static getMainUrl = (): string => RootRoutes.ACCOUNT;
  public static getSettingsUrl = (): string => RootRoutes.ACCOUNT + AccountRoutes.SETTINGS;
  public static getChangePasswordUrl = (): string => RootRoutes.ACCOUNT + AccountRoutes.CHANGE_PASSWORD;
}

const AccountRouter = () => {
  return (
    <>
      <Route index element={<AccountMain />} />
      <Route path={RootRoutes.ACCOUNT + AccountRoutes.SETTINGS} element={<AccountSettings />} />
      <Route path={RootRoutes.ACCOUNT + AccountRoutes.CHANGE_PASSWORD} element={<AccountChangePassword />} />
      {/*Redirects*/}
      <Route path="*" element={<PageNotFoundRedirect />} />
    </>
  );
};

export default AccountRouter;
