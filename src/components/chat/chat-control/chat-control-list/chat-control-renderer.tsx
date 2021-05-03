import React, {FC, memo} from 'react';
import ChatControlChat from './chat-control-chat';
import {ChatControlItemProps} from './types';
import {areEqual} from 'react-window';

type Props = ChatControlItemProps;

const ChatControlRenderer: FC<Props> = ({data, index, style}: Props) => {
  const chat = data.items[index];
  const isSelected = chat.id === data.chat?.id;
  const account = data.account;
  const handleOnChatClick = data.handleOnChatClick(index);

  return (
    <ChatControlChat chat={chat} isSelected={isSelected} account={account} onClick={handleOnChatClick} style={style} />
  );
};

export default memo(ChatControlRenderer, areEqual);
