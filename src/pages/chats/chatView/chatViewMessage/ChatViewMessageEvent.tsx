import React, {memo, useCallback} from 'react';
import {Message} from '../../../../models/Message';
import {useTranslation} from 'react-i18next';
import {useAppSelector} from '../../../../store/store';
import InfoSelectors from '../../../../store/info/infoSelectors';
import {MessageUtils} from '../../../../shared/utils/MessageUtils';
import {Typography} from '@mui/material';
import FHStack from '../../../../components/boxes/FHStack';

type ChatViewMessageEventProps = {
  message: Message;
};

const ChatViewMessageEvent = ({message}: ChatViewMessageEventProps) => {
  const userSelector = useCallback(InfoSelectors.makeUserSelector(), []);
  const usersSelector = useCallback(InfoSelectors.makeUsersSelector(), []);
  const {t} = useTranslation();
  const params = MessageUtils.parseEventMessage(message);
  const messageUsers = useAppSelector((state) => userSelector(state, message.userId));
  const paramUsers = useAppSelector((state) => usersSelector(state, params.ids || []));

  const text = MessageUtils.buildEventMessageText(params, messageUsers, paramUsers, t);

  return (
    <FHStack justifyContent="center">
      <Typography color="grey.400" fontSize={14}>
        {text}
      </Typography>
    </FHStack>
  );
};

export default memo(ChatViewMessageEvent);
