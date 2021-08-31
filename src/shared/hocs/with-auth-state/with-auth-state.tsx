import * as React from 'react';
import {ComponentType, FC, PropsWithChildren, ReactElement} from 'react';
import {RootState} from '../../../store';
import {AuthState} from '../../../store/rerducers/auth.reducer';
import {connect, ConnectedProps} from 'react-redux';
import {flowRight} from 'lodash';

const mapStateToProps = (state: RootState): {authState: AuthState} => ({authState: state.authState});
const connector = connect(mapStateToProps);

type Props = PropsWithChildren<ConnectedProps<typeof connector>>;

const withAuthState = (Component: ComponentType<AuthState>): FC => (props: Props): ReactElement => {
  const {authState, ...propsWithoutAuthState} = props;

  return (
    <Component {...propsWithoutAuthState} isAuthenticated={authState.isAuthenticated} account={authState.account} />
  );
};

export default flowRight([connector, withAuthState]);
