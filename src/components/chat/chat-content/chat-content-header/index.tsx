import React, {FC} from 'react';
import {Box} from '@material-ui/core';
import {chatContentHeaderStyles} from './_styles';
import {Chat} from '../../../../models/chat.model';
import ChatContentActions from './chat-content-actions';
import ChatContentMembers from '../chat-content-members';
import {useTranslation} from 'react-i18next';

type Props = {
  chat: Chat;
  title: string;
  closeChat: () => void;
  clearMessages: () => void;
};

const ChatContentHeader: FC<Props> = (props: Props) => {
  const {chat, title} = props;
  const {closeChat, clearMessages} = props;
  const classes = chatContentHeaderStyles();
  const {t} = useTranslation();

  // UNCOMMENT FOR DEVELOPMENT
  // chat.isDirect = false;

  return (
    <Box className={classes.root}>
      <Box className={classes.title}>
        {title}
        {chat.isDirect && <Box className={classes.direct}>{t('chat:common.direct')}</Box>}
      </Box>
      <ChatContentMembers chat={chat} />
      <ChatContentActions chat={chat} title={title} closeChat={closeChat} clearMessages={clearMessages} />
    </Box>
  );
};

export default ChatContentHeader;
