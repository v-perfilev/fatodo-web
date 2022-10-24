import React, {useCallback} from 'react';
import {Message} from '../../../../models/Message';
import {useTranslation} from 'react-i18next';
import FHStack from '../../../../components/boxes/FHStack';
import {useAppSelector} from '../../../../store/store';
import InfoSelectors from '../../../../store/info/infoSelectors';
import FBox from '../../../../components/boxes/FBox';
import {Typography} from '@mui/material';

type ChatListMessageIncomingProps = {
  message: Message;
};

const ChatListMessageIncoming = ({message}: ChatListMessageIncomingProps) => {
  const userSelector = useCallback(InfoSelectors.makeUserSelector(), []);
  const {t} = useTranslation();
  const user = useAppSelector((state) => userSelector(state, message.userId));

  return (
    <FHStack spacing={1}>
      <Typography color="grey.400" fontWeight="bold" fontSize={12}>
        {user?.username}:
      </Typography>
      {!message.isDeleted && (
        <FBox>
          <Typography fontSize={12}>{message.text}</Typography>
        </FBox>
      )}
      {message.isDeleted && (
        <Typography color="grey.400" fontWeight="bold" fontSize={12}>
          {t('chat:message.deleted')}
        </Typography>
      )}
    </FHStack>
  );
};

export default ChatListMessageIncoming;
