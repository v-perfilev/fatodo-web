import * as React from 'react';
import {ComponentType, FC} from 'react';
import {Route, RouteProps} from 'react-router-dom';
import withHeader from '../hoc/with-header';
import {compose} from 'recompose';
import withFlexibleHeader from '../hoc/with-flexible-header';

const RouteWithHeader = compose<ComponentType<RouteProps>>(withHeader)(Route);
const RouteWithFlexibleHeader = compose<ComponentType<RouteProps>>(withFlexibleHeader)(Route);
const DefaultRoute = Route;

export type WrappedRouteProps = RouteProps & {
  withHeader?: boolean;
  withFlexibleHeader?: boolean;
};

type Props = WrappedRouteProps;

const WrappedRoute: FC<Props> = ({withHeader, withFlexibleHeader, ...props}: Props) => {
  if (withHeader) {
    return <RouteWithHeader {...props} />;
  } else if (withFlexibleHeader) {
    return <RouteWithFlexibleHeader {...props} />;
  } else {
    return <DefaultRoute {...props} />;
  }
};

export default WrappedRoute;
