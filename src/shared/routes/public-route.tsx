import * as React from 'react';
import {FC} from 'react';
import {Route, RouteProps} from 'react-router-dom';

const PublicRoute: FC<RouteProps & any> = (props) => {
  return <Route {...props} />;
};

export default PublicRoute;
