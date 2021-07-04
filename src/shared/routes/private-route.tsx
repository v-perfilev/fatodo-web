import * as React from 'react';
import {FC} from 'react';
import {AuthState} from '../../store/rerducers/auth.reducer';
import {Route, RouteProps, useHistory} from 'react-router-dom';
import {Routes} from '../../pages/router';
import withAuthState from '../hocs/with-auth-state';

type BaseProps = RouteProps;

type Props = AuthState & BaseProps;

const PrivateRoute: FC<Props> = ({isAuthenticated, ...props}: Props) => {
  const history = useHistory();

  if (!isAuthenticated) {
    history.push(Routes.UNAUTHORIZED);
  }

  return isAuthenticated && <Route {...props} />;
};

export default withAuthState(PrivateRoute);
