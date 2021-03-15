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
import {User} from '../../../models/user.model';

type Props = {
  chat: Chat;
  setChat: (chat: Chat) => void;
  account: User;
}

const MessageControlList: FC<Props> = ({chat, setChat, account}: Props) => {
  const classes = messageControlListStyles();
  const {handleResponse} = useSnackContext();
  const [loading, setLoading] = useState(false);
  const [chats, setChats] = useState<Chat[]>([]);

  const handleOnChatClick = (index: number) => (): void => {
    const chat = chats[index];
    setChat(chat);
  };

  const loadChats = (): void => {
    setLoading(true);
    MessageService.getAllChatsPageable()
      .then((response) => {
        setChats(response.data);
      })
      .catch((response) => {
        handleResponse(response);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  useEffect(() => {
    loadChats();
  }, []);

  const rowRenderer = ({index, key, style}): ReactElement => (
    <MessageControlChat chat={chats[index]} account={account}
                        isSelected={chat?.id === chats[index].id} key={key} style={style}
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

  return loading ? (
    <MessageControlLoader />
  ) : (
    <Box className={classes.root}>
      <AutoSizer>
        {listRenderer}
      </AutoSizer>
    </Box>
  );

};

export default MessageControlList;
