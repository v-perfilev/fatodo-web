import React from 'react';
import {Route, RouteProps} from 'react-router-dom';

type Props = RouteProps;

const PublicRoute = (props: Props) => {
  return <Route {...props} />;
};

export default PublicRoute;
