import React, {ComponentType, FC, memo, ReactElement, useEffect, useRef, useState} from 'react';
import {useAppDispatch, useAppSelector} from '../../../store/store';
import AuthSelectors from '../../../store/auth/authSelectors';
import {ContactsActions} from '../../../store/contacts/contactsActions';
import {ChatsActions} from '../../../store/chats/chatsActions';
import {EventsActions} from '../../../store/events/eventsActions';
import {AuthActions} from '../../../store/auth/authActions';
import {SecurityUtils} from '../../utils/SecurityUtils';
import {flowRight} from 'lodash';
import {ActivityDTO} from '../../../models/dto/ActivityDTO';
import {ACTIVITY_TIMEOUT} from '../../../constants';

export type WithRootProps = {
  ready: boolean;
};

const withRootContainer = (Component: ComponentType<WithRootProps>): FC => (props: any): ReactElement => {
  const dispatch = useAppDispatch();
  const isAuthenticated = useAppSelector(AuthSelectors.isAuthenticated);
  const [ready, setReady] = useState(false);
  const activityTimerId = useRef<number>();

  const login = (): void => {
    const tryToLogin = async (token: string): Promise<void> => {
      token && (await dispatch(AuthActions.setIsAuthenticated()));
      token && (await dispatch(AuthActions.fetchAccountThunk()));
    };
    SecurityUtils.getAuthToken().then((token) => tryToLogin(token).finally(() => setReady(true)));
  };

  const refresh = (): void => {
    dispatch(ContactsActions.fetchRelationsThunk());
    dispatch(ContactsActions.fetchOutcomingRequestsThunk());
    dispatch(ContactsActions.fetchIncomingRequestsThunk());
    dispatch(ChatsActions.fetchUnreadMessagesMapThunk());
    dispatch(EventsActions.fetchUnreadCountThunk());
  };

  const writeActivity = (): void => {
    SecurityUtils.getAuthToken().then((token) => {
      if (token) {
        const deviceType = 'WEB';
        const deviceId = token.substring(0, 10);
        const dto: ActivityDTO = {deviceType, deviceId};
        dispatch(AuthActions.writeActivityThunk(dto));
      }
    });
  };

  useEffect(() => {
    login();
  }, []);

  useEffect(() => {
    if (isAuthenticated) {
      refresh();
      activityTimerId.current = window.setInterval(() => writeActivity(), ACTIVITY_TIMEOUT);
    } else {
      window.clearInterval(activityTimerId.current);
    }
  }, [isAuthenticated]);

  return <Component ready={ready} {...props} />;
};

export default flowRight([memo, withRootContainer]);
