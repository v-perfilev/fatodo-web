import React, {FC, useEffect} from 'react';
import {Message} from '../../../../models/message.model';
import {chatControlMessageEventStyles} from './_styles';
import {Box} from '@material-ui/core';
import {useUserListContext} from '../../../../shared/contexts/list-contexts/user-list-context';
import {MessageUtils} from '../../../../shared/utils/message.utils';
import {useTranslation} from 'react-i18next';

type Props = {
  message: Message;
};

const ChatControlMessageEvent: FC<Props> = ({message}: Props) => {
  const classes = chatControlMessageEventStyles();
  const {users, handleUserIds} = useUserListContext();
  const {t} = useTranslation();

  const params = MessageUtils.parseEventMessage(message);
  const text = MessageUtils.buildEventMessageText(message, params, users, t);

  useEffect(() => {
    if (params.ids) {
      handleUserIds(params.ids);
    }
  }, []);

  return <Box className={classes.root}>{text}</Box>;
};

export default ChatControlMessageEvent;
