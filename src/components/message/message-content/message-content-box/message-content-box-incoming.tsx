import React, {FC} from 'react';
import {Message} from '../../../../models/message.model';
import {messageContentBoxIncomingStyles} from './_styles';
import {Box} from '@material-ui/core';
import {UrlPic} from '../../../common/images';
import {DateFormatters} from '../../../../shared/utils/date.utils';
import {useUserListContext} from '../../../../shared/contexts/list-contexts/user-list-context';
import {MessageUtils} from '../../message.utils';

type Props = {
  message: Message;
};

const MessageContentBoxIncoming: FC<Props> = ({message}: Props) => {
  const classes = messageContentBoxIncomingStyles();
  const {users} = useUserListContext();

  const user = MessageUtils.extractUserFromMessage(users, message);
  const date = DateFormatters.formatTimeAndDateWithYear(new Date(message.createdAt));

  return (
    <Box className={classes.root}>
      <UrlPic alt={user?.username} url={user?.imageFilename} size="lg" border={1} />
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

export default MessageContentBoxIncoming;
