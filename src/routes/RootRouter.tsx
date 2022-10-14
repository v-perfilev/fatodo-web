import React from 'react';
import {Route, Routes} from 'react-router-dom';
import Unauthorized from '../pages/static/Unauthorized';
import Forbidden from '../pages/static/Forbidden';
import InternalError from '../pages/static/InternalError';
import PageNotFound from '../pages/static/PageNotFound';
import PageNotFoundRedirect from './PageNotFoundRedirect';
import Auth from '../pages/public/auth/Auth';
import SocialLogin from '../pages/public/socialLogin/SocialLogin';
import Activation from '../pages/public/activation/Activation';
import NotActivated from '../pages/static/NotActivated';
import ForgotPassword from '../pages/public/forgotPassword/ForgotPassword';
import ResetPassword from '../pages/public/resetPassword/ResetPassword';

export enum RootRoutes {
  ROOT = '/',
  GROUPS = '/groups',
  ITEMS = '/items',
  CONTACTS = '/contacts',
  CHATS = '/chats',
  ACCOUNT = '/account',
  LOGIN = '/login',
  REGISTRATION = '/registration',
  SOCIAL_LOGIN = '/social-login',
  SOCIAL_LOGIN_WITH_PARAM = '/social-login/:token',
  ACTIVATION_WITH_PARAM = '/activation/:code',
  FORGOT_PASSWORD = '/forgot-password',
  RESET_PASSWORD_WITH_PARAM = '/reset-password/:code',
  NOT_ACTIVATED = '/not-activated',
  UNAUTHORIZED = '/unauthorized',
  FORBIDDEN = '/forbidden',
  INTERNAL_ERROR = '/something-went-wrong',
  PAGE_NOT_FOUND = '/page-not-found',
}

const RootRouter = () => {
  return (
    <Routes>
      {/*<MixedRoute path={RootRoutes.ROOT} element={Box} redirectUrl={RootRoutes.GROUPS} />*/}
      {/*Private Routes*/}
      {/*<PrivateRoute path={Routes.GROUPS} component={GroupRouter} />*/}
      {/*<PrivateRoute path={Routes.ITEMS} component={ItemRouter} />*/}
      {/*<PrivateRoute path={Routes.CONTACTS} component={ContactRouter} />*/}
      {/*<PrivateRoute path={Routes.CHATS} component={ChatRouter} />*/}
      {/*<PrivateRoute path={Routes.ACCOUNT} component={AccountSettings} />*/}
      {/*Auth Routes*/}
      <Route path={RootRoutes.LOGIN} element={<Auth />} />
      <Route path={RootRoutes.REGISTRATION} element={<Auth />} />
      <Route path={RootRoutes.SOCIAL_LOGIN_WITH_PARAM} element={<SocialLogin />} />
      <Route path={RootRoutes.ACTIVATION_WITH_PARAM} element={<Activation />} />
      <Route path={RootRoutes.FORGOT_PASSWORD} element={<ForgotPassword />} />
      <Route path={RootRoutes.RESET_PASSWORD_WITH_PARAM} element={<ResetPassword />} />
      {/*Errors*/}
      <Route path={RootRoutes.NOT_ACTIVATED} element={<NotActivated />} />
      <Route path={RootRoutes.UNAUTHORIZED} element={<Unauthorized />} />
      <Route path={RootRoutes.FORBIDDEN} element={<Forbidden />} />
      <Route path={RootRoutes.INTERNAL_ERROR} element={<InternalError />} />
      <Route path={RootRoutes.PAGE_NOT_FOUND} element={<PageNotFound />} />
      {/*Redirects*/}
      <Route path="*" element={<PageNotFoundRedirect />} />
    </Routes>
  );
};

export default RootRouter;
