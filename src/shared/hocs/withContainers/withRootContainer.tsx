import React, {ComponentType, FC, memo, ReactElement, useEffect, useState} from 'react';
import {useAppDispatch, useAppSelector} from '../../../store/store';
import AuthSelectors from '../../../store/auth/authSelectors';
import {ContactsActions} from '../../../store/contacts/contactsActions';
import {ChatsActions} from '../../../store/chats/chatsActions';
import {EventsActions} from '../../../store/events/eventsActions';
import {AuthActions} from '../../../store/auth/authActions';
import {SecurityUtils} from '../../utils/SecurityUtils';
import {RootActions} from '../../../store/rootActions';
import {flowRight} from 'lodash';

export type WithRootProps = {
  ready: boolean;
};

const withRootContainer = (Component: ComponentType<WithRootProps>): FC => (props: any): ReactElement => {
  const dispatch = useAppDispatch();
  const isAuthenticated = useAppSelector(AuthSelectors.isAuthenticated);
  const isSleepMode = useAppSelector(AuthSelectors.isSleepMode);
  const [ready, setReady] = useState(false);

  const login = (): void => {
    const tryToLogin = async (token: string): Promise<void> => {
      token && (await dispatch(AuthActions.setIsAuthenticated()));
      token && (await dispatch(AuthActions.fetchAccountThunk()));
    };
    SecurityUtils.getAuthToken().then((token) => tryToLogin(token).finally(() => setReady(true)));
  };

  const refresh = (): void => {
    dispatch(ContactsActions.fetchRelationsThunk());
    dispatch(ContactsActions.fetchInfoThunk());
    dispatch(ChatsActions.fetchUnreadMessagesMapThunk());
    dispatch(EventsActions.fetchUnreadCountThunk());
  };

  const reset = (): void => {
    dispatch(RootActions.resetState());
  };

  useEffect(() => {
    login();
  }, []);

  useEffect(() => {
    !isSleepMode && isAuthenticated && refresh();
    isSleepMode && reset();
  }, [isSleepMode]);

  useEffect(() => {
    isAuthenticated && refresh();
  }, [isAuthenticated]);

  return <Component ready={ready} {...props} />;
};

export default flowRight([memo, withRootContainer]);
