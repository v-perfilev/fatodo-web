import React, {FC, HTMLAttributes} from 'react';
import {Box} from '@material-ui/core';
import {Chat} from '../../../models/chat.model';
import {messageControlChatStyles} from './_styles';
import {UrlPic} from '../../common/images';
import {DateFormatters} from '../../../shared/utils/date.utils';

type Props = HTMLAttributes<HTMLElement> & {
  chat: Chat;
};

const MessageControlChat: FC<Props> = ({chat, ...props}: Props) => {
  const classes = messageControlChatStyles();

  const getDate = (timestamp: string): string => {
    const timestampNumber = Number(timestamp) * 1000;
    return (
      DateFormatters.formatTime(new Date(timestampNumber)) +
      ' ' +
      DateFormatters.formatDateWithYear(new Date(timestampNumber))
    );
  };

  return (
    <Box className={classes.root} {...props}>
      <UrlPic className={classes.image} alt={null} url={null} size="lg" border={1} />
      <Box className={classes.chatContainer}>
        <Box className={classes.topContainer}>
          <Box className={classes.title}>
            {chat.title}
          </Box>
          <Box className={classes.date}>
            {getDate(chat.lastMessage.createdAt)}
          </Box>
        </Box>
        <Box className={classes.text}>
          {chat.lastMessage.text}
        </Box>
      </Box>
    </Box>
  );
};

export default MessageControlChat;

