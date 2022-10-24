import React, {useCallback} from 'react';
import {Message} from '../../../../models/Message';
import {useTranslation} from 'react-i18next';
import {useAppSelector} from '../../../../store/store';
import InfoSelectors from '../../../../store/info/infoSelectors';
import {MessageUtils} from '../../../../shared/utils/MessageUtils';
import {Typography} from '@mui/material';

type ChatListMessageEventProps = {
  message: Message;
};

const ChatListMessageEvent = ({message}: ChatListMessageEventProps) => {
  const userSelector = useCallback(InfoSelectors.makeUserSelector(), []);
  const usersSelector = useCallback(InfoSelectors.makeUsersSelector(), []);
  const {t} = useTranslation();
  const params = MessageUtils.parseEventMessage(message);
  const messageUser = useAppSelector((state) => userSelector(state, message.userId));
  const paramUsers = useAppSelector((state) => usersSelector(state, params.ids || []));

  const text = MessageUtils.buildEventMessageText(params, messageUser, paramUsers, t);

  return (
    <Typography color="grey.500" fontSize={14}>
      {text}
    </Typography>
  );
};

export default ChatListMessageEvent;
