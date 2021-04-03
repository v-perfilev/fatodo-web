import React, {FC, useEffect} from 'react';
import {Message} from '../../../../models/message.model';
import {chatContentMessageIncomingStyles} from './_styles';
import {Box} from '@material-ui/core';
import {UrlPic} from '../../../common/images';
import {DateFormatters} from '../../../../shared/utils/date.utils';
import {useUserListContext} from '../../../../shared/contexts/list-contexts/user-list-context';
import {MessageUtils} from '../../../../shared/utils/message.utils';
import csx from 'classnames';
import {User} from '../../../../models/user.model';
import ChatService from '../../../../services/chat.service';
import {TIMEOUT_BEFORE_MARK_AS_READ} from '../../_constants';

type Props = {
  message: Message;
  account: User;
  isVisible: boolean;
};

const ChatContentMessageIncoming: FC<Props> = ({message, account, isVisible}: Props) => {
  const classes = chatContentMessageIncomingStyles();
  const {users} = useUserListContext();
  let timerId;

  const user = MessageUtils.extractUserFromMessage(users, message);
  const date = DateFormatters.formatTimeAndDateWithYear(new Date(message.createdAt));
  const isRead = MessageUtils.isReadMessage(message, account);

  const messageClassName = csx(classes.message, {unread: !isRead});

  const markAsRead = (): void => {
    ChatService.markMessageAsRead(message.id);
  };

  useEffect(() => {
    if (isVisible && !isRead) {
      timerId = window.setTimeout(() => markAsRead(), TIMEOUT_BEFORE_MARK_AS_READ);
    } else if (!isVisible && !isRead) {
      window.clearTimeout(timerId);
    }
  }, [isVisible]);

  return (
    <Box className={classes.root}>
      <UrlPic alt={user?.username} url={user?.imageFilename} size="lg" border={1} />
      <Box className={messageClassName}>
        <Box className={classes.header}>
          <Box className={classes.name}>{user?.username}</Box>
          <Box className={classes.date}>{date}</Box>
        </Box>
        <Box className={classes.body}>{message.text}</Box>
      </Box>
    </Box>
  );
};

export default ChatContentMessageIncoming;
