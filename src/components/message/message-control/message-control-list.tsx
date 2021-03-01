import React, {FC, ReactElement} from 'react';
import {Box} from '@material-ui/core';
import {messageControlListStyles} from './_styles';
import AutoSizer from 'react-virtualized-auto-sizer';
import {FixedSizeList} from 'react-window';
import MessageControlChat from './message-control-chat';
import {CHAT_HEIGHT} from '../_constants';

type Props = {
  setChatId: (chatId: string) => void;
}

const MessageControlList: FC<Props> = ({setChatId}: Props) => {
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

  const selectChat = (index: number) => (): void => {
    const chatId = chats[index].id;
    setChatId(chatId);
  };

  const RowRenderer = ({index, style}): ReactElement => (
    <MessageControlChat chat={chats[index]} style={style} onClick={selectChat(index)} />
  );

  const ListRenderer = ({height, width}): ReactElement => (
    <FixedSizeList
      height={height}
      width={width}
      itemCount={chats.length}
      itemSize={CHAT_HEIGHT}
      overscanCount={50}
    >
      {RowRenderer}
    </FixedSizeList>
  );

  return (
    <Box className={classes.root}>
      <AutoSizer>
        {ListRenderer}
      </AutoSizer>
    </Box>
  );
};

export default MessageControlList;
