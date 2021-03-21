import React, {FC} from 'react';
import {Message} from '../../../models/message.model';
import {messageBoxOutcomingStyles} from './_styles';
import {Box} from '@material-ui/core';
import {User} from '../../../models/user.model';
import {DateFormatters} from '../../../shared/utils/date.utils';

type Props = {
  message: Message;
  user: User;
};

const MessageBoxOutcoming: FC<Props> = ({message, user}: Props) => {
  const classes = messageBoxOutcomingStyles();

  const date = DateFormatters.formatTimeAndDateWithYear(new Date(message.createdAt));

  return (
    <Box className={classes.root}>
      <Box className={classes.message}>
        <Box className={classes.header}>
          <Box className={classes.name}>{user.username}</Box>
          <Box className={classes.date}>{date}</Box>
        </Box>
        <Box className={classes.body}>{message.text}</Box>
      </Box>
    </Box>
  );
};

export default MessageBoxOutcoming;
