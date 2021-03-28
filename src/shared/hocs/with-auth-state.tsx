import * as React from 'react';
import {ComponentType, FC, PropsWithChildren, ReactElement} from 'react';
import {compose} from 'recompose';
import {RootState} from '../../store';
import {AuthState} from '../../store/rerducers/auth.reducer';
import {connect, ConnectedProps} from 'react-redux';

const mapStateToProps = (state: RootState): {authState: AuthState} => ({authState: state.authState});
const connector = connect(mapStateToProps);

type Props = ConnectedProps<typeof connector> & PropsWithChildren<any>;

const withAuthState = (Component: ComponentType<AuthState>): FC => (props: Props): ReactElement => {
  const {authState, ...propsWithoutAuthState} = props;

  return (
    <Component {...propsWithoutAuthState} isAuthenticated={authState.isAuthenticated} account={authState.account} />
  );
};

export default compose(connector, withAuthState);
