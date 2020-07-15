import * as React from 'react';
import {FC} from 'react';
import WrappedRoute, {WrappedRouteProps} from './wrapped-route';

const PublicRoute: FC<WrappedRouteProps> = (props) => <WrappedRoute {...props} />;

export default PublicRoute;
