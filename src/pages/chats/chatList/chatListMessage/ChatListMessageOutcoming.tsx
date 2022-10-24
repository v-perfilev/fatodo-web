import React from 'react';
import {Message} from '../../../../models/Message';
import {useTranslation} from 'react-i18next';
import FHStack from '../../../../components/boxes/FHStack';
import FBox from '../../../../components/boxes/FBox';
import {Typography} from '@mui/material';

type ChatListMessageOutcomingProps = {
  message: Message;
};

const ChatListMessageOutcoming = ({message}: ChatListMessageOutcomingProps) => {
  const {t} = useTranslation();

  return (
    <FHStack spacing={1}>
      <Typography color="grey.400" fontWeight="bold" fontSize={12}>
        {t('salutations.you')}:
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

export default ChatListMessageOutcoming;
