import * as React from 'react';
import {FC} from 'react';
import {Switch} from 'react-router-dom';
import {PublicRoute} from '../shared/routes';
import Unauthorized from './static/unauthorized';
import NotActivated from './static/not-activated';
import Activated from './static/activated';
import Home from './home';
import InternalError from './static/internal-error';
import Activation from './auth/activation';
import withContentWrapper from './common/wrappers/with-content-wrapper';
import Forbidden from './static/forbidden';
import PageNotFound from './static/page-not-found';

export enum RouteNames {
  ROOT = '/',
  ACTIVATION = '/activation/:code',
  NOT_ACTIVATED = '/not-activated',
  ACTIVATED = '/activated',
  UNAUTHORIZED = '/unauthorized',
  FORBIDDEN = '/forbidden',
  INTERNAL_ERROR = '/something-went-wrong',
}

const Routes: FC = () => (
  <Switch>
    <PublicRoute exact path={RouteNames.ROOT} component={Home} />
    {/*Auth Routes*/}
    <PublicRoute path={RouteNames.ACTIVATION} component={Activation} />
    <PublicRoute path={RouteNames.NOT_ACTIVATED} component={NotActivated} />
    <PublicRoute path={RouteNames.ACTIVATED} component={Activated} />
    {/*Errors*/}
    <PublicRoute path={RouteNames.UNAUTHORIZED} component={Unauthorized} />
    <PublicRoute path={RouteNames.FORBIDDEN} component={Forbidden} />
    <PublicRoute path={RouteNames.INTERNAL_ERROR} component={InternalError} />
    <PublicRoute component={PageNotFound} />
  </Switch>
);

export default withContentWrapper(Routes);
