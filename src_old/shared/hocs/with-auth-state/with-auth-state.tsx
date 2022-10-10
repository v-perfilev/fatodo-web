import * as React from 'react';
import {ComponentType, FC, PropsWithChildren, ReactElement, useMemo} from 'react';
import {RootState} from '../../../store';
import {AuthState} from '../../../store/rerducers/auth.reducer';
import {connect, ConnectedProps} from 'react-redux';
import {flowRight} from 'lodash';
import {UserAccount} from '../../../models/user.model';

const mapStateToProps = (state: RootState): {authState: AuthState} => ({authState: state.authState});
const connector = connect(mapStateToProps);

type Props = PropsWithChildren<ConnectedProps<typeof connector>>;

const withAuthState = (Component: ComponentType<AuthState>): FC => (props: Props): ReactElement => {
  const {authState, ...propsWithoutAuthState} = props;

  const isAuthenticated = useMemo<boolean>(() => authState.isAuthenticated, [authState.isAuthenticated]);
  const account = useMemo<UserAccount>(() => authState.account, [authState.account?.id]);

  return <Component {...propsWithoutAuthState} isAuthenticated={isAuthenticated} account={account} />;
};

export default flowRight([connector, withAuthState]);
