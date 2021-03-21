import React, {FC} from 'react';
import SockJsClient from 'react-stomp';
import {AUTHORIZATION_HEADER, AUTHORIZATION_PREFIX} from '../../../constants';
import {SecurityUtils} from '../../../shared/utils/security.utils';

type Props = {
  url: string;
  topics: string[];
  onMessage: (msg: any, topic: string) => void;
}

const WsClient: FC<Props> = ({url, topics, onMessage}: Props) => {
  const headers = {
    [AUTHORIZATION_HEADER]: AUTHORIZATION_PREFIX + SecurityUtils.getAuthToken()
  };

  return (
    <SockJsClient
      headers={headers}
      url={url}
      topics={topics}
      onMessage={onMessage}
      debug={false}
    />
  );
};

export default WsClient;
