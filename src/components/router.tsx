import * as React from 'react';
import {FC} from 'react';
import {Redirect, Switch} from 'react-router-dom';
import PublicRoute from '../shared/routes/public-route';
import Unauthorized from './static/unauthorized';
import InternalError from './static/internal-error';
import Activation from './account/activation';
import Forbidden from './static/forbidden';
import PageNotFound from './static/page-not-found';
import Auth from './account/auth';
import ForgotPassword from './account/forgot-password';
import ResetPassword from './account/reset-password';
import NotActivated from './static/not-activated';
import SocialLogin from './account/social-login';
import Home from './home';
import GroupRouter from './groups/_router';

export enum Routes {
  ROOT = '/',
  GROUPS = '/groups',
  LOGIN = '/login',
  REGISTRATION = '/registration',
  SOCIAL_LOGIN = '/social-login',
  SOCIAL_LOGIN_WITH_PARAM = '/social-login/:token',
  ACTIVATION_WITH_PARAM = '/activation/:code',
  NOT_ACTIVATED = '/not-activated',
  FORGOT_PASSWORD = '/forgot-password',
  RESET_PASSWORD_WITH_PARAM = '/reset-password/:code',
  UNAUTHORIZED = '/unauthorized',
  FORBIDDEN = '/forbidden',
  INTERNAL_ERROR = '/something-went-wrong',
  PAGE_NOT_FOUND = '/page-not-found',
}

const Router: FC = () => (
  <Switch>
    <PublicRoute exact path={Routes.ROOT} component={Home} />
    <PublicRoute path={Routes.GROUPS} component={GroupRouter} />
    {/*Auth Router*/}
    <PublicRoute path={Routes.LOGIN} component={Auth} />
    <PublicRoute path={Routes.REGISTRATION} component={Auth} />
    <PublicRoute path={Routes.SOCIAL_LOGIN_WITH_PARAM} component={SocialLogin} />
    <PublicRoute path={Routes.ACTIVATION_WITH_PARAM} component={Activation} />
    <PublicRoute path={Routes.NOT_ACTIVATED} component={NotActivated} />
    <PublicRoute path={Routes.FORGOT_PASSWORD} component={ForgotPassword} />
    <PublicRoute path={Routes.RESET_PASSWORD_WITH_PARAM} component={ResetPassword} />
    {/*Errors*/}
    <PublicRoute path={Routes.UNAUTHORIZED} component={Unauthorized} />
    <PublicRoute path={Routes.FORBIDDEN} component={Forbidden} />
    <PublicRoute path={Routes.INTERNAL_ERROR} component={InternalError} />
    <PublicRoute path={Routes.PAGE_NOT_FOUND} component={PageNotFound} />
    <Redirect to={Routes.PAGE_NOT_FOUND} />
  </Switch>
);

export default Router;
