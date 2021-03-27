import React, {FC, useEffect} from 'react';
import {Message} from '../../../models/message.model';
import {messageBoxIncomingStyles} from './_styles';
import {Box} from '@material-ui/core';
import {UrlPic} from '../../common/images';
import {DateFormatters} from '../../../shared/utils/date.utils';
import {useUserListContext} from '../../../shared/contexts/list-contexts/user-list-context';

type Props = {
  message: Message;
};

const MessageBoxIncoming: FC<Props> = ({message}: Props) => {
  const classes = messageBoxIncomingStyles();
  const {users, handleUserIds} = useUserListContext();

  const user = users.find((user) => user.id === message.userId);
  const date = DateFormatters.formatTimeAndDateWithYear(new Date(message.createdAt));

  useEffect(() => {
    handleUserIds([message.userId]);
  }, []);

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

export default MessageBoxIncoming;
