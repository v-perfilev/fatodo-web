import * as React from 'react';
import {FC} from 'react';
import {AuthState} from '../../store/rerducers/auth.reducer';
import {Route, RouteProps, useHistory} from 'react-router-dom';
import {compose} from 'recompose';
import {Routes} from '../../components/router';
import withAuthState from '../hocs/with-auth-state';

type Props = AuthState & RouteProps;

const PrivateRoute: FC<Props> = ({isAuthenticated, ...props}: Props) => {
  const history = useHistory();

  if (!isAuthenticated) {
    history.push(Routes.UNAUTHORIZED);
  }

  return isAuthenticated && <Route {...props} />;
};

export default compose<RouteProps>(withAuthState)(PrivateRoute);
