import * as React from 'react';
import {FC} from 'react';
import {Switch} from 'react-router-dom';
import PublicRoute from '../shared/routes/public-route';
import Unauthorized from './static/unauthorized';
import NotActivated from './static/not-activated';
import Activated from './static/activated';
import Home from './home';
import InternalError from './static/internal-error';
import Activation from './account/activation';
import Forbidden from './static/forbidden';
import PageNotFound from './static/page-not-found';

export enum Routes {
  ROOT = '/',
  ACTIVATION = '/activation/:code',
  NOT_ACTIVATED = '/not-activated',
  ACTIVATED = '/activated',
  UNAUTHORIZED = '/unauthorized',
  FORBIDDEN = '/forbidden',
  INTERNAL_ERROR = '/something-went-wrong',
}

const Router: FC = () => (
  <Switch>
    <PublicRoute withHeader exact path={Routes.ROOT} component={Home} />
    {/*Auth Router*/}
    <PublicRoute path={Routes.ACTIVATION} component={Activation} />
    <PublicRoute path={Routes.NOT_ACTIVATED} component={NotActivated} />
    <PublicRoute path={Routes.ACTIVATED} component={Activated} />
    {/*Errors*/}
    <PublicRoute path={Routes.UNAUTHORIZED} component={Unauthorized} />
    <PublicRoute path={Routes.FORBIDDEN} component={Forbidden} />
    <PublicRoute path={Routes.INTERNAL_ERROR} component={InternalError} />
    <PublicRoute component={PageNotFound} />
  </Switch>
);

export default Router;
