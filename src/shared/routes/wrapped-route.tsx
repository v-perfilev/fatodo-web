import * as React from 'react';
import {ComponentType, FC} from 'react';
import {Route, RouteProps} from 'react-router-dom';
import withHeader from '../hoc/with-header';
import {compose} from 'recompose';

const DefaultRoute = Route;
const RouteWithHeader = compose<ComponentType<RouteProps>>(withHeader)(Route);

export interface WrappedRouteProps {
  withHeader?: boolean;
}

type ComposedProps = WrappedRouteProps & RouteProps;

const WrappedRoute: FC<ComposedProps> = ({withHeader, ...props}) => {
  if (withHeader) {
    return <RouteWithHeader {...props} />;
  } else {
    return <DefaultRoute {...props} />;
  }
};

export default WrappedRoute;
