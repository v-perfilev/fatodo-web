import React, {FC, memo, useEffect} from 'react';
import {Message} from '../../../../models/message.model';
import {messageContentBoxEventStyles} from './_styles';
import {Box} from '@material-ui/core';
import {DateFormatters} from '../../../../shared/utils/date.utils';
import {useUserListContext} from '../../../../shared/contexts/list-contexts/user-list-context';
import {MessageUtils} from '../../../../shared/utils/message.utils';
import {useTranslation} from 'react-i18next';

type Props = {
  message: Message;
};

const MessageContentBoxEvent: FC<Props> = ({message}: Props) => {
  const classes = messageContentBoxEventStyles();
  const {users, handleUserIds} = useUserListContext();
  const {t} = useTranslation();

  const date = DateFormatters.formatTimeAndDateWithYear(new Date(message.createdAt));
  const params = MessageUtils.parseEventMessage(message);
  const text = MessageUtils.buildEventMessageText(message, params, users, t);

  useEffect(() => {
    if (params.ids) {
      handleUserIds(params.ids);
    }
  }, []);

  return (
    <Box className={classes.root}>
      <Box className={classes.date}>{date}</Box>
      <Box className={classes.text}>{text}</Box>
    </Box>
  );
};

export default memo(MessageContentBoxEvent);
