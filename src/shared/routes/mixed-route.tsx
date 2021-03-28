import * as React from 'react';
import {FC} from 'react';
import {AuthState} from '../../store/rerducers/auth.reducer';
import {Route, RouteProps, useHistory} from 'react-router-dom';
import {compose} from 'recompose';
import withAuthState from '../hocs/with-auth-state';

type Props = AuthState &
  RouteProps & {
    redirect: string;
  };

const MixedRoute: FC<Props> = ({isAuthenticated, redirect, ...props}: Props) => {
  const history = useHistory();

  if (isAuthenticated) {
    history.push(redirect);
  }

  return !isAuthenticated && <Route {...props} />;
};

export default compose<RouteProps>(withAuthState)(MixedRoute);
