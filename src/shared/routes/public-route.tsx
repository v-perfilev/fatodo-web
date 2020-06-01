import * as React from 'react';
import {FC} from 'react';
import {RouteProps} from 'react-router-dom';
import WrappedRoute, {WrappedRouteProps} from './wrapped-route';

type ComposedProps = WrappedRouteProps & RouteProps;

const PublicRoute: FC<ComposedProps> = (props) => <WrappedRoute {...props} />;

export default PublicRoute;
