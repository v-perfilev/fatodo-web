import * as React from 'react';
import {FC} from 'react';
import {Switch} from 'react-router-dom';
import {PublicRoute} from '../shared/routes';
import PageNotFound from './static/page-not-found';
import Unauthorized from './static/unauthorized';
import registered from './static/registered';
import NotActivated from './static/not-activated';
import Activated from './static/activated';
import Home from './home';
import InternalError from './static/internal-error';
import Activation from './static/activation';

export enum RouteNames {
  ROOT = '/',
  REGISTERED = '/registered',
  NOT_ACTIVATED = '/not-activated',
  ACTIVATION = '/activation/:code',
  ACTIVATED = '/activated',
  UNAUTHORIZED = '/unauthorized',
  INTERNAL_ERROR = '/something-went-wrong',
}

const Routes: FC = () => (
  <Switch>
    <PublicRoute exact path={RouteNames.ROOT} component={Home} />
    {/*Auth Routes*/}
    <PublicRoute path={RouteNames.REGISTERED} component={registered} />
    <PublicRoute path={RouteNames.NOT_ACTIVATED} component={NotActivated} />
    <PublicRoute path={RouteNames.ACTIVATION} component={Activation} />
    <PublicRoute path={RouteNames.ACTIVATED} component={Activated} />
    {/*Errors*/}
    <PublicRoute path={RouteNames.UNAUTHORIZED} component={Unauthorized} />
    <PublicRoute path={RouteNames.INTERNAL_ERROR} component={InternalError} />
    <PublicRoute component={PageNotFound} />
  </Switch>
);

export default Routes;
