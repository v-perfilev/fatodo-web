import React, {FC, memo} from 'react';
import {ChatControlItemProps} from './types';
import ChatControlItem from '../chat-control-item/chat-control-item';

type Props = ChatControlItemProps;

const ChatControlListRenderer: FC<Props> = ({data, index, style}: Props) => {
  const chat = data.items[index];
  const isSelected = chat.id === data.chat?.id;
  const account = data.account;
  const handleOnChatClick = data.handleOnChatClick(index);

  return (
    <ChatControlItem chat={chat} isSelected={isSelected} account={account} onClick={handleOnChatClick} style={style} />
  );
};

export default memo(ChatControlListRenderer);
