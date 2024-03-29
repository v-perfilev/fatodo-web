import React from 'react';
import {Navigate, Route, Routes} from 'react-router-dom';
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
import {useAppSelector} from '../store/store';
import AuthSelectors from '../store/auth/authSelectors';
import GroupRouter from './GroupRouter';
import ItemRouter from './ItemRouter';
import ContactRouter from './ContactRouter';
import ChatRouter from './ChatRouter';
import AccountRouter from './AccountRouter';
import ProtectedRouteOutlet from './outlets/ProtectedRouteOutlet';
import PublicRouteOutlet from './outlets/PublicRouteOutlet';
import CalendarView from '../pages/calendar/calendarView/CalendarView';

export enum RootRoutes {
  ROOT = '/',
  GROUPS = '/groups',
  ITEMS = '/items',
  CALENDAR = '/calendar',
  CHATS = '/chats',
  CONTACTS = '/contacts',
  ACCOUNT = '/account',
  LOGIN = '/login',
  REGISTRATION = '/registration',
  SOCIAL_LOGIN = '/social-login',
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
  const isAuthenticated = useAppSelector(AuthSelectors.isAuthenticated);

  const mixedRoute = isAuthenticated ? <Navigate to={RootRoutes.GROUPS} /> : <Navigate to={RootRoutes.LOGIN} />;
  const protectedRoute = isAuthenticated ? <ProtectedRouteOutlet /> : <Navigate to={RootRoutes.UNAUTHORIZED} />;
  const publicRoute = !isAuthenticated ? <PublicRouteOutlet /> : <Navigate to={RootRoutes.ROOT} />;

  return (
    <Routes>
      <Route path={RootRoutes.ROOT} element={mixedRoute} />

      {/*Private Routes*/}
      <Route path={RootRoutes.GROUPS} element={protectedRoute}>
        {GroupRouter()}
      </Route>
      <Route path={RootRoutes.ITEMS} element={protectedRoute}>
        {ItemRouter()}
      </Route>
      <Route path={RootRoutes.CALENDAR} element={protectedRoute}>
        <Route index element={<CalendarView />} />
      </Route>
      <Route path={RootRoutes.CHATS} element={protectedRoute}>
        {ChatRouter()}
      </Route>
      <Route path={RootRoutes.CONTACTS} element={protectedRoute}>
        {ContactRouter()}
      </Route>
      <Route path={RootRoutes.ACCOUNT} element={protectedRoute}>
        {AccountRouter()}
      </Route>

      {/*Auth Routes*/}
      <Route path={RootRoutes.LOGIN} element={publicRoute}>
        <Route index element={<Auth />} />
      </Route>
      <Route path={RootRoutes.REGISTRATION} element={publicRoute}>
        <Route index element={<Auth />} />
      </Route>
      <Route path={RootRoutes.FORGOT_PASSWORD} element={publicRoute}>
        <Route index element={<ForgotPassword />} />
      </Route>
      <Route path={RootRoutes.SOCIAL_LOGIN} element={publicRoute}>
        <Route index element={<SocialLogin />} />
      </Route>
      <Route path={RootRoutes.ACTIVATION_WITH_PARAM} element={publicRoute}>
        <Route index element={<Activation />} />
      </Route>
      <Route path={RootRoutes.RESET_PASSWORD_WITH_PARAM} element={publicRoute}>
        <Route index element={<ResetPassword />} />
      </Route>

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
