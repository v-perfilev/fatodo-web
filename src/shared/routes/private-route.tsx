import * as React from 'react';
import {FC} from 'react';
import {RootState} from '../../store';
import {connect, ConnectedProps} from 'react-redux';
import {AuthState} from '../../store/rerducers/auth.reducer';
import {Route, RouteProps, useHistory} from 'react-router-dom';
import {compose} from 'recompose';
import {Routes} from '../../components/router';

const mapStateToProps = (state: RootState): {authState: AuthState} => ({authState: state.authState});
const connector = connect(mapStateToProps);

type Props = ConnectedProps<typeof connector> & RouteProps;

const PrivateRoute: FC<Props> = ({authState, ...props}: Props) => {
  const {isAuthenticated} = authState;
  const history = useHistory();

  if (!isAuthenticated) {
    history.push(Routes.UNAUTHORIZED);
  }

  return <Route {...props} />;
};

export default compose<RouteProps>(connector)(PrivateRoute);
