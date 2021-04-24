import React, {FC, useEffect, useMemo} from 'react';
import {Message} from '../../../../models/message.model';
import {chatContentMessageEventStyles} from './_styles';
import {Box} from '@material-ui/core';
import {useUserListContext} from '../../../../shared/contexts/list-contexts/user-list-context';
import {MessageUtils} from '../../../../shared/utils/message.utils';
import {useTranslation} from 'react-i18next';

type Props = {
  message: Message;
};

const ChatContentMessageEvent: FC<Props> = ({message}: Props) => {
  const classes = chatContentMessageEventStyles();
  const {users, handleUserIds} = useUserListContext();
  const {t} = useTranslation();

  const params = useMemo((): any => {
    return MessageUtils.parseEventMessage(message);
  }, [message]);
  const text = useMemo((): string => {
    return MessageUtils.buildEventMessageText(message, params, users, t);
  }, [message, params, users]);

  useEffect(() => {
    if (params.ids) {
      handleUserIds(params.ids);
    }
  }, []);

  return (
    <Box className={classes.root}>
      <Box className={classes.text}>{text}</Box>
    </Box>
  );
};

export default ChatContentMessageEvent;
