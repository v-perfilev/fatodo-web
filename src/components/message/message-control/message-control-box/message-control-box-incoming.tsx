import React, {FC} from 'react';
import {Message} from '../../../../models/message.model';
import {messageControlBoxIncomingStyles} from './_styles';
import {Box} from '@material-ui/core';
import {useUserListContext} from '../../../../shared/contexts/list-contexts/user-list-context';
import {MessageUtils} from '../../message.utils';

type Props = {
  message: Message;
};

const MessageControlBoxIncoming: FC<Props> = ({message}: Props) => {
  const classes = messageControlBoxIncomingStyles();
  const {users} = useUserListContext();

  const user = MessageUtils.extractUserFromMessage(users, message);

  return (
    <Box className={classes.root}>
      <span className={classes.salutation}>{user?.username}: </span>
      {message.text}
    </Box>
  );
};

export default MessageControlBoxIncoming;
