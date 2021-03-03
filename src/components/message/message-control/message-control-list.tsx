import React, {FC, ReactElement} from 'react';
import {Box} from '@material-ui/core';
import {messageControlListStyles} from './_styles';
import MessageControlChat from './message-control-chat';
import {CHAT_HEIGHT} from '../_constants';
import {AutoSizer, List} from 'react-virtualized';
import {Chat} from '../../../models/chat.model';

type Props = {
  chat: Chat;
  setChat: (chat: Chat) => void;
}

const MessageControlList: FC<Props> = ({chat, setChat}: Props) => {
  const classes = messageControlListStyles();

  const array = Array.from({length: 5000}, (_, i) => i);

  const chats = array.map((value) => {
    const message = {
      chatId: `chat_id_${value}`,
      userId: 'test',
      text: `message_${value}`,
      forwardedMessage: null,
      isEvent: false,
      createdAt: new Date().getTime() + '',
      statuses: [],
      reactions: []
    };
    return {
      id: `chat_id_${value}`,
      title: `test_${value}`,
      isDirect: false,
      members: [],
      lastMessage: message
    };
  });

  const handleOnChatClick = (index: number) => (): void => {
    const chat = chats[index];
    setChat(chat);
  };

  const rowRenderer = ({index, key, style}): ReactElement => (
    <MessageControlChat chat={chats[index]} isSelected={chat?.id === chats[index].id} key={key} style={style}
                        onClick={handleOnChatClick(index)} />
  );

  const listRenderer = ({height, width}): ReactElement => (
    <List
      height={height}
      width={width}
      rowCount={chats.length}
      rowHeight={CHAT_HEIGHT}
      rowRenderer={rowRenderer}
    />
  );

  return (
    <Box className={classes.root}>
      <AutoSizer>
        {listRenderer}
      </AutoSizer>
    </Box>
  );
};

export default MessageControlList;
