import React, {FC} from 'react';
import {Message} from '../../../../models/message.model';
import {chatControlMessageIncomingStyles} from './_styles';
import {Box} from '@material-ui/core';
import {useUserListContext} from '../../../../shared/contexts/list-contexts/user-list-context';
import {MessageUtils} from '../../../../shared/utils/message.utils';
import {useTranslation} from 'react-i18next';

type Props = {
  message: Message;
};

const ChatControlMessageIncoming: FC<Props> = ({message}: Props) => {
  const classes = chatControlMessageIncomingStyles();
  const {users} = useUserListContext();
  const {t} = useTranslation();

  const user = MessageUtils.extractUserFromMessage(users, message);

  return (
    <Box className={classes.root}>
      <span className={classes.salutation}>{user?.username}: </span>
      {!message.isDeleted && <span>{message.text}</span>}
      {message.isDeleted && <Box className={classes.deleted}>{t('chat:message.deleted')}</Box>}
    </Box>
  );
};

export default ChatControlMessageIncoming;
