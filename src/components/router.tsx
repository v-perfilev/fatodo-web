import * as React from 'react';
import {FC} from 'react';
import {Switch} from 'react-router-dom';
import PublicRoute from '../shared/routes/public-route';
import Unauthorized from './static/unauthorized';
import Home from './home';
import InternalError from './static/internal-error';
import Activation from './account/activation';
import Forbidden from './static/forbidden';
import PageNotFound from './static/page-not-found';
import Auth from './account/auth';
import ForgotPassword from './account/forgot-password';
import ResetPassword from './account/reset-password';

export enum Routes {
  ROOT = '/',
  LOGIN = '/login',
  REGISTRATION = '/registration',
  ACTIVATION = '/activation/:code',
  FORGOT_PASSWORD = '/forgot-password',
  RESET_PASSWORD = '/reset-password/:code',
  UNAUTHORIZED = '/unauthorized',
  FORBIDDEN = '/forbidden',
  INTERNAL_ERROR = '/something-went-wrong',
}

const Router: FC = () => (
  <Switch>
    <PublicRoute withHeader exact path={Routes.ROOT} component={Home} />
    {/*Auth Router*/}
    <PublicRoute path={Routes.LOGIN} component={Auth} />
    <PublicRoute path={Routes.REGISTRATION} component={Auth} />
    <PublicRoute path={Routes.ACTIVATION} component={Activation} />
    <PublicRoute path={Routes.FORGOT_PASSWORD} component={ForgotPassword} />
    <PublicRoute path={Routes.RESET_PASSWORD} component={ResetPassword} />
    {/*Errors*/}
    <PublicRoute path={Routes.UNAUTHORIZED} component={Unauthorized} />
    <PublicRoute path={Routes.FORBIDDEN} component={Forbidden} />
    <PublicRoute path={Routes.INTERNAL_ERROR} component={InternalError} />
    <PublicRoute component={PageNotFound} />
  </Switch>
);

export default Router;
