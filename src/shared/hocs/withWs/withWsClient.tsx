import * as React from 'react';
import {ComponentType, memo, useEffect, useRef} from 'react';
import WsClient from '../../../components/ws/WsClient';
import {WS_ROOT_TOPIC, WS_URL} from '../../../constants';
import {WsEvent} from '../../../models/Ws';
import {useAppDispatch, useAppSelector} from '../../../store/store';
import {WsEventHandler} from './WsEventHandler';
import {WsStateHandler} from './WsStateHandler';
import AuthSelectors from '../../../store/auth/authSelectors';
import {flowRight} from 'lodash';

const withWsClient = (Component: ComponentType) => (props: any) => {
  const dispatch = useAppDispatch();
  const account = useAppSelector(AuthSelectors.account);
  const isSleepMode = useAppSelector(AuthSelectors.isSleepMode);
  const wsStateHandler = useRef<WsStateHandler>();
  const wsEventHandler = useRef<WsEventHandler>();

  const onMessage = (msg: WsEvent<any>): void => {
    msg.payload = JSON.parse(msg.payload);
    wsStateHandler.current.handleMessage(msg);
    wsEventHandler.current.handleMessage(msg);
  };

  useEffect(() => {
    wsStateHandler.current = new WsStateHandler(dispatch, account);
    wsEventHandler.current = new WsEventHandler(dispatch, account);
  }, [account]);

  return (
    <>
      <Component {...props} />
      <WsClient active={!isSleepMode} url={WS_URL} topics={[WS_ROOT_TOPIC]} onMessage={onMessage} debug />
    </>
  );
};

export default flowRight([memo, withWsClient]);
