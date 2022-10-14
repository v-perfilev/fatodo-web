import React from 'react';
import {redirect, Route, RouteProps} from 'react-router-dom';
import {useAppSelector} from '../store/store';
import AuthSelectors from '../store/auth/authSelectors';
import {RootRoutes} from './RootRouter';

type PrivateRouteProps = RouteProps;

const PrivateRoute = (props: PrivateRouteProps) => {
  const isAuthenticated = useAppSelector(AuthSelectors.isAuthenticated);

  if (!isAuthenticated) {
    redirect(RootRoutes.UNAUTHORIZED);
  }

  return isAuthenticated && <Route {...props} />;
};

export default PrivateRoute;
