import * as React from 'react';
import {FC} from 'react';
import {RootState} from '../../store';
import {connect, ConnectedProps} from 'react-redux';
import {AuthState} from '../../store/rerducers/auth.reducer';
import {Route, RouteProps, useHistory} from 'react-router-dom';
import {compose} from 'recompose';

const mapStateToProps = (state: RootState): {authState: AuthState} => ({authState: state.authState});
const connector = connect(mapStateToProps);

type Props = ConnectedProps<typeof connector> &
  RouteProps & {
    redirect: string;
  };

const MixedRoute: FC<Props> = ({authState, redirect, ...props}: Props) => {
  const {isAuthenticated} = authState;
  const history = useHistory();

  if (isAuthenticated) {
    history.push(redirect);
  }

  return !isAuthenticated && <Route {...props} />;
};

export default compose<RouteProps>(connector)(MixedRoute);
