import React from 'react';
import {redirect, Route, RouteProps} from 'react-router-dom';
import {useAppSelector} from '../store/store';
import AuthSelectors from '../store/auth/authSelectors';

type MixedRouteProps = RouteProps & {
  redirectUrl: string;
};

const MixedRoute = ({redirectUrl, ...props}: MixedRouteProps) => {
  const isAuthenticated = useAppSelector(AuthSelectors.isAuthenticated);

  if (isAuthenticated) {
    redirect(redirectUrl);
  }

  return <Route {...props} />;
};

export default MixedRoute;
