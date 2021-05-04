import React, {FC, useMemo} from 'react';
import {Message} from '../../../../models/message.model';
import {chatContentMessageIncomingStyles} from './_styles';
import {Box, Hidden} from '@material-ui/core';
import {UrlPic} from '../../../common/images';
import {DateFormatters} from '../../../../shared/utils/date.utils';
import {useUserListContext} from '../../../../shared/contexts/list-contexts/user-list-context';
import {MessageUtils} from '../../../../shared/utils/message.utils';
import csx from 'classnames';
import {User} from '../../../../models/user.model';
import ChatContentMessageActions from './chat-content-message-actions';
import ChatContentMessageReactions from './chat-content-message-reactions';
import {useTranslation} from 'react-i18next';

type Props = {
  message: Message;
  account: User;
};

const ChatContentMessageIncoming: FC<Props> = ({message, account}: Props) => {
  const classes = chatContentMessageIncomingStyles();
  const {users} = useUserListContext();
  const {t} = useTranslation();

  const user = useMemo((): User => {
    return MessageUtils.extractUserFromMessage(users, message);
  }, [users, message]);

  const date = useMemo((): string => {
    return DateFormatters.formatTime(new Date(message.createdAt));
  }, [message.createdAt]);

  const isRead = useMemo((): boolean => {
    return MessageUtils.isReadMessage(message, account);
  }, [message.statuses, account]);

  const messageClassName = csx(classes.message, {unread: !isRead});

  return (
    <Box className={classes.root}>
      <Hidden xsDown>
        <UrlPic alt={user?.username} url={user?.imageFilename} size="lg" border={1} />
      </Hidden>
      <Box className={messageClassName}>
        <Box className={classes.header}>
          <Box className={classes.name}>{user?.username}</Box>
          <Box className={classes.date}>{date}</Box>
          <ChatContentMessageActions message={message} />
        </Box>
        <Box className={classes.body}>
          {!message.isDeleted && <span>{message.text}</span>}
          {message.isDeleted && <span className={classes.deleted}>{t('chat:message.deleted')}</span>}
        </Box>
      </Box>
      <ChatContentMessageReactions message={message} account={account} />
    </Box>
  );
};

export default ChatContentMessageIncoming;
