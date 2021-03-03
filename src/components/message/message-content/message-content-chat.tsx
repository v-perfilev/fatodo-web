import React, {FC} from 'react';
import MessageContentHeader from './message-content-header';
import MessageContentList from './message-content-list';
import MessageContentFooter from './message-content-footer';


const MessageContentChat: FC = () => {

  return (
    <>
      <MessageContentHeader />
      <MessageContentList />
      <MessageContentFooter />
    </>
  );
};

export default MessageContentChat;
