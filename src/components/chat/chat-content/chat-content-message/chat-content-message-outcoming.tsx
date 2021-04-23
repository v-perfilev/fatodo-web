import React, {FC} from 'react';
import {Message} from '../../../../models/message.model';
import {chatContentMessageOutcomingStyles} from './_styles';
import {Box} from '@material-ui/core';
import {DateFormatters} from '../../../../shared/utils/date.utils';
import {useUserListContext} from '../../../../shared/contexts/list-contexts/user-list-context';
import {MessageUtils} from '../../../../shared/utils/message.utils';

type Props = {
  message: Message;
};

const ChatContentMessageOutcoming: FC<Props> = ({message}: Props) => {
  const classes = chatContentMessageOutcomingStyles();
  const {users} = useUserListContext();

  const user = MessageUtils.extractUserFromMessage(users, message);
  const date = DateFormatters.formatTime(new Date(message.createdAt));

  return (
    <Box className={classes.root}>
      <Box className={classes.message}>
        <Box className={classes.header}>
          <Box className={classes.name}>{user?.username}</Box>
          <Box className={classes.date}>{date}</Box>
        </Box>
        <Box className={classes.body}>{message.text}</Box>
      </Box>
    </Box>
  );
};

export default ChatContentMessageOutcoming;
