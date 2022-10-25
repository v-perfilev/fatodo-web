import React, {memo} from 'react';
import {Message} from '../../../../models/Message';
import {useTranslation} from 'react-i18next';
import FHStack from '../../../../components/boxes/FHStack';
import FVStack from '../../../../components/boxes/FVStack';
import ChatViewMessageReactions from './ChatViewMessageReactions';
import ChatViewMessageMenu from './ChatViewMessageMenu';
import DateView from '../../../../components/views/DateView';
import {SxProps, Typography} from '@mui/material';

type ChatViewMessageOutcomingProps = {
  message: Message;
};

const ChatViewMessageOutcoming = ({message}: ChatViewMessageOutcomingProps) => {
  const {t} = useTranslation();
  const date = new Date(message.createdAt);

  return (
    <FHStack sx={containerStyles} justifyContent="flex-end">
      <ChatViewMessageReactions message={message} isOutcoming />
      <FVStack sx={messageStyles} spacing={1}>
        <FHStack>
          <FHStack>
            <Typography color="primary" fontWeight="bold" fontSize={14}>
              {t('salutations.you')}
            </Typography>
          </FHStack>
          <FHStack flexGrow={0}>
            <Typography color="grey.400" fontWeight="bold" fontSize={12}>
              <DateView date={date} timeFormat="FULL" />
            </Typography>
            <ChatViewMessageMenu message={message} isOutcoming />
          </FHStack>
        </FHStack>
        {!message.isDeleted && <Typography fontSize={14}>{message.text}</Typography>}
        {message.isDeleted && (
          <Typography color="grey.400" fontWeight="bold" fontSize={14}>
            {t('chat:message.deleted')}
          </Typography>
        )}
      </FVStack>
    </FHStack>
  );
};

const containerStyles: SxProps = {
  marginLeft: '10%',
  width: '90%',
};

const messageStyles: SxProps = {
  flexShrink: 1,
  minWidth: '60%',
  paddingLeft: 2,
  paddingRight: 1,
  paddingTop: 1,
  paddingBottom: 2,
  backgroundColor: 'grey.100',
  borderRadius: 3,
};

export default memo(ChatViewMessageOutcoming);
