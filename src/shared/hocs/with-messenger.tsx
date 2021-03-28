import * as React from 'react';
import {ComponentType, FC, PropsWithChildren, ReactElement, useEffect} from 'react';
import {compose} from 'recompose';
import withWsMessageClient from './with-ws-client/with-ws-message-client';
import withAuthState from './with-auth-state';
import {AuthState} from '../../store/rerducers/auth.reducer';
import MessageService from '../../services/message.service';

type Props = AuthState & PropsWithChildren<any>;

const withMessenger = (Component: ComponentType): FC => ({isAuthenticated, ...props}: Props): ReactElement => {

  useEffect(() => {
    if (isAuthenticated) {
      MessageService.getUnreadMessagesMap().then((response) => {
        console.log(response);
      });
    }
  }, [isAuthenticated]);

  return <Component {...props} />;
};

export default compose(withWsMessageClient, withAuthState, withMessenger);
