import * as React from 'react';
import {FC} from 'react';
import {RootState} from '../../store';
import {connect, ConnectedProps} from 'react-redux';
import {AuthState} from '../../store/rerducers/auth.reducer';
import {Redirect, Route, RouteProps} from 'react-router-dom';
import {compose} from 'recompose';
import {enqueueSnackbar} from '../../store/actions/notification.actions';
import {useTranslation} from 'react-i18next';
import {NotificationBuilder} from '../notification/notification.builder';

const mapStateToProps = (state: RootState): {authState: AuthState} => ({authState: state.authState});
const mapDispatchToProps = {enqueueSnackbar};
const connector = connect(mapStateToProps, mapDispatchToProps);

type Props = ConnectedProps<typeof connector> & RouteProps;

const PrivateRoute: FC<RouteProps> = (routeProps: RouteProps, {authState, enqueueSnackbar}: Props) => {
  const {isAuthenticated} = authState;
  const {t} = useTranslation();

  if (!isAuthenticated) {
    const notification = new NotificationBuilder(t('feedback:security.unauthorized')).setVariant('warning').build();
    enqueueSnackbar(notification);
  }

  return isAuthenticated ? <Route {...routeProps} /> : <Redirect to="/" />;
};

export default compose<RouteProps>(connector)(PrivateRoute);
