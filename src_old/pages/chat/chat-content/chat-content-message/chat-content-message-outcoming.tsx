import React, {FC, useMemo} from 'react';
import {Message} from '../../../../models/message.model';
import {chatContentMessageOutcomingStyles} from './_styles';
import {Box} from '@material-ui/core';
import {DateFormatters} from '../../../../shared/utils/date.utils';
import {useUserListContext} from '../../../../shared/contexts/list-contexts/user-list-context';
import {MessageUtils} from '../../../../shared/utils/message.utils';
import {User} from '../../../../models/user.model';
import ChatContentMessageActions from './chat-content-message-actions';
import ChatContentMessageReactions from './chat-content-message-reactions';
import {useTranslation} from 'react-i18next';

type Props = {
  message: Message;
  account: User;
};

const ChatContentMessageOutcoming: FC<Props> = ({message, account}: Props) => {
  const classes = chatContentMessageOutcomingStyles();
  const {users} = useUserListContext();
  const {t} = useTranslation();

  const user = useMemo((): User => {
    return MessageUtils.extractUserFromMessage(users, message);
  }, [users, message]);

  const date = useMemo((): string => {
    return DateFormatters.formatTime(new Date(message.createdAt));
  }, [message]);

  return (
    <Box className={classes.root}>
      <ChatContentMessageReactions message={message} account={account} />
      <Box className={classes.message}>
        <Box className={classes.header}>
          <Box className={classes.name}>{user?.username}</Box>
          <Box className={classes.date}>{date}</Box>
          <ChatContentMessageActions message={message} isOutcoming />
        </Box>
        <Box className={classes.body}>
          {!message.isDeleted && <span>{message.text}</span>}
          {message.isDeleted && <span className={classes.deleted}>{t('chat:message.deleted')}</span>}
        </Box>
      </Box>
    </Box>
  );
};

export default ChatContentMessageOutcoming;
