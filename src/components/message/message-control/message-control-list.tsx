import React, {FC, ReactElement, useEffect, useState} from 'react';
import {Box} from '@material-ui/core';
import {messageControlListStyles} from './_styles';
import MessageControlChat from './message-control-chat';
import {CHAT_HEIGHT} from '../_constants';
import {AutoSizer, List} from 'react-virtualized';
import {Chat} from '../../../models/chat.model';
import MessageControlLoader from './message-control-loader';
import MessageService from '../../../services/message.service';
import {useSnackContext} from '../../../shared/contexts/snack-context';

type Props = {
  chat: Chat;
  setChat: (chat: Chat) => void;
}

const MessageControlList: FC<Props> = ({chat, setChat}: Props) => {
  const classes = messageControlListStyles();
  const {handleResponse} = useSnackContext();
  const [chats, setChats] = useState<Chat[]>([]);

  const handleOnChatClick = (index: number) => (): void => {
    const chat = chats[index];
    setChat(chat);
  };

  const loadChats = (): void => {
    MessageService.getAllChatsPageable()
      .then((response) => {
        setChats(response.data);
      })
      .catch((response) => {
        handleResponse(response);
      });
  };

  useEffect(() => {
    loadChats();
  }, [chat]);

  const rowRenderer = ({index, key, style}): ReactElement => (
    <MessageControlChat chat={chats[index]} isSelected={chat?.id === chats[index].id} key={key} style={style}
                        onClick={handleOnChatClick(index)} />
  );

  const noRowsRenderer = (): ReactElement => (
    <MessageControlLoader />
  );

  const listRenderer = ({height, width}): ReactElement => (
    <List
      height={height}
      width={width}
      rowCount={chats.length}
      rowHeight={CHAT_HEIGHT}
      rowRenderer={rowRenderer}
      noRowsRenderer={noRowsRenderer}
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
