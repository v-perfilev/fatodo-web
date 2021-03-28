import * as React from 'react';
import {ComponentType, FC, PropsWithChildren, ReactElement} from 'react';
import {compose} from 'recompose';
import withWsMessageClient from './with-ws-client/with-ws-message-client';
import withAuthState from './with-auth-state';
import {AuthState} from '../../store/rerducers/auth.reducer';

type Props = AuthState & PropsWithChildren<any>;

const withMessenger = (Component: ComponentType): FC => (props: Props): ReactElement => {
  return <Component {...props} />;
};

export default compose(withWsMessageClient, withAuthState, withMessenger);
