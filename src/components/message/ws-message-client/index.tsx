import React, {FC} from 'react';
import SockJsClient from 'react-stomp';
import {AUTHORIZATION_HEADER, AUTHORIZATION_PREFIX, MESSAGE_API_URL} from '../../../constants';
import {SecurityUtils} from '../../../shared/utils/security.utils';


const WsMessageClient: FC = () => {

  const headers = {
    [AUTHORIZATION_HEADER]: AUTHORIZATION_PREFIX + SecurityUtils.getAuthToken()
  };

  const onConnected = (): void => {
    console.log('WS connected');
  };

  const onDisconnected = (): void => {
    console.log('WS disconnected');
  };

  const onMessageReceived = (msg: any): void => {
    console.log('message received', msg);
  };

  return (
    <SockJsClient
      url={MESSAGE_API_URL}
      topics={['/user/chat/all']}
      headers={headers}
      onConnect={onConnected}
      onDisconnect={onDisconnected}
      onMessage={onMessageReceived}
      debug={false}
    />
  );
};

export default WsMessageClient;
