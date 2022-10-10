import * as React from 'react';
import {FC} from 'react';
import {AuthState} from '../../store/rerducers/auth.reducer';
import {Route, RouteProps, useHistory} from 'react-router-dom';
import withAuthState from '../hocs/with-auth-state/with-auth-state';

type BaseProps = RouteProps & {
  redirect: string;
};

type Props = AuthState & BaseProps;

const MixedRoute: FC<Props> = ({isAuthenticated, redirect, ...props}: Props) => {
  const history = useHistory();

  if (isAuthenticated) {
    setTimeout(() => history.push(redirect), 100);
  }

  return !isAuthenticated && <Route {...props} />;
};

export default withAuthState(MixedRoute);
