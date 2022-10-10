import * as React from 'react';
import {ComponentType, FC, PropsWithChildren, ReactElement, useState} from 'react';
import WsClient from '../../../components/ws/WsClient';
import {WS_URL} from '../../../constants';
import withAuthState from '../with-auth-state/with-auth-state';
import {AuthState} from '../../../store/rerducers/auth.reducer';
import {flowRight} from 'lodash';
import {WsContext} from '../../contexts/ws-contexts/ws-context';
import {WsTopicsAndHandler} from '../../contexts/ws-contexts/types';

type BaseProps = PropsWithChildren<HTMLElement>;

type Props = AuthState & BaseProps;

const withWsClient = (Component: ComponentType): FC => (props: Props): ReactElement => {
  const {isAuthenticated} = props;
  const [topicsAndHandlers, setTopicsAndHandlers] = useState<Map<string, WsTopicsAndHandler>>(new Map());

  const setTopicsAndHandler = (key: string, topicsAndHandler: WsTopicsAndHandler): void => {
    setTopicsAndHandlers((prevState) => {
      prevState.set(key, topicsAndHandler);
      return new Map(prevState);
    });
  };

  const removeTopicsAndHandler = (key: string): void => {
    setTopicsAndHandlers((prevState) => {
      if (prevState.has(key)) {
        prevState.delete(key);
      }
      return new Map(prevState);
    });
  };

  const topics = Array.from(topicsAndHandlers.values())
    .map((topicsAndHandler) => topicsAndHandler.topics)
    .reduce((acc, topics) => [...acc, ...topics], []);

  const onMessage = (msg: any, topic: string): void => {
    Array.from(topicsAndHandlers.values())
      .map((topicsAndHandler) => topicsAndHandler.handler)
      .forEach((handler) => handler(msg, topic));
  };

  const context = {
    setTopicsAndHandler,
    removeTopicsAndHandler,
  };

  return (
    <WsContext.Provider value={context}>
      <Component {...props} />
      {isAuthenticated && <WsClient url={WS_URL} topics={topics} onMessage={onMessage} />}
    </WsContext.Provider>
  );
};

export default flowRight([withAuthState, withWsClient]);
