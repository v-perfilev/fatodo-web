import React from 'react';
import SockJsClient from 'react-stomp';
import {AUTHORIZATION_HEADER, AUTHORIZATION_PREFIX, DEBUG_WS} from '../../constants';
import {SecurityUtils} from '../../shared/utils/security.utils';

type WsClientProps = {
  url: string;
  topics: string[];
  onMessage: (msg: any, topic: string) => void;
};

const WsClient = ({url, topics, onMessage}: WsClientProps) => {
  const headers = {
    [AUTHORIZATION_HEADER]: AUTHORIZATION_PREFIX + SecurityUtils.getAuthToken(),
  };

  const debug = Boolean(DEBUG_WS).valueOf();
  return <SockJsClient headers={headers} url={url} topics={topics} onMessage={onMessage} debug={debug} />;
};

export default WsClient;
