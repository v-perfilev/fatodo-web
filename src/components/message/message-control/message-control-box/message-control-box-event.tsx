import React, {FC, useEffect, useState} from 'react';
import {EventMessageParams, Message} from '../../../../models/message.model';
import {messageBoxEventStyles} from './_styles';
import {Box} from '@material-ui/core';
import {DateFormatters} from '../../../../shared/utils/date.utils';
import {useUserListContext} from '../../../../shared/contexts/list-contexts/user-list-context';
import {MessageUtils} from '../../message.utils';
import {useTranslation} from 'react-i18next';

type Props = {
  message: Message;
};

const MessageControlBoxEvent: FC<Props> = ({message}: Props) => {
  const classes = messageBoxEventStyles();
  const {users, handleUserIds} = useUserListContext();
  const {i18n, t} = useTranslation();
  const [text, setText] = useState<string>();
  const [params, setParams] = useState<EventMessageParams>();

  const date = DateFormatters.formatTimeAndDateWithYear(new Date(message.createdAt));

  useEffect(() => {
    const parsedParams = MessageUtils.parseEventMessage(message);
    setParams(parsedParams);
  }, []);

  useEffect(() => {
    const userIds = [];
    if (params?.userId) {
      userIds.push(params.userId);
    }
    if (params?.ids) {
      userIds.push(...params.ids);
    }
    handleUserIds(userIds);
  }, [params]);

  useEffect(() => {
    const newText = MessageUtils.buildEventMessageText(message, params, users, t);
    setText(newText);
  }, [i18n.language, users, params]);

  return (
    <Box className={classes.root}>
      <Box className={classes.date}>{date}</Box>
      <Box className={classes.text}>{text}</Box>
    </Box>
  );
};

export default MessageControlBoxEvent;
