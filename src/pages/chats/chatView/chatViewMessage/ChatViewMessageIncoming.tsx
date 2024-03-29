import React, {memo, useCallback} from 'react';
import {Message} from '../../../../models/Message';
import {useTranslation} from 'react-i18next';
import FHStack from '../../../../components/boxes/FHStack';
import {useAppSelector} from '../../../../store/store';
import InfoSelectors from '../../../../store/info/infoSelectors';
import AuthSelectors from '../../../../store/auth/authSelectors';
import FVStack from '../../../../components/boxes/FVStack';
import UserView from '../../../../components/views/UserView';
import ChatViewMessageReactions from './ChatViewMessageReactions';
import ChatViewMessageMenu from './ChatViewMessageMenu';
import DateView from '../../../../components/views/DateView';
import {Box, SxProps, Typography} from '@mui/material';
import {MessageUtils} from '../../../../shared/utils/MessageUtils';
import UserLink from '../../../../components/links/UserLink';

type ChatViewMessageIncomingProps = {
  message: Message;
};

const ChatViewMessageIncoming = ({message}: ChatViewMessageIncomingProps) => {
  const userSelector = useCallback(InfoSelectors.makeUserSelector(), []);
  const account = useAppSelector(AuthSelectors.account);
  const user = useAppSelector((state) => userSelector(state, message.userId));
  const {t} = useTranslation();

  const date = new Date(message.createdAt);
  const isRead = MessageUtils.isReadMessage(message, account);

  return (
    <FHStack sx={containerStyles} alignItems="flex-start">
      <Box marginTop={1}>{user && <UserView user={user} size={40} />}</Box>
      <FVStack sx={messageStyles(isRead)} spacing={1}>
        <FHStack>
          <FHStack>
            <Typography color="primary" fontWeight="bold" fontSize={14}>
              <UserLink user={user} />
            </Typography>
          </FHStack>
          <FHStack flexGrow={0}>
            <Typography color="grey.400" fontSize={12} whiteSpace="nowrap">
              <DateView date={date} timeFormat="FULL" />
            </Typography>
            <ChatViewMessageMenu message={message} isOutcoming={false} />
          </FHStack>
        </FHStack>
        {!message.isDeleted && <Typography fontSize={14}>{message.text}</Typography>}
        {message.isDeleted && (
          <Typography color="grey.400" fontWeight="bold" fontSize={14}>
            {t('chat:message.deleted')}
          </Typography>
        )}
      </FVStack>
      <ChatViewMessageReactions comment={message} isOwnComment={false} />
    </FHStack>
  );
};

const containerStyles: SxProps = {
  width: '90%',
  marginRight: '10%',
};

const messageStyles = (isRead: boolean): SxProps => ({
  flexShrink: 1,
  minWidth: '60%',
  borderWidth: 1,
  borderStyle: 'solid',
  borderColor: isRead ? 'grey.50' : 'primary.main',
  paddingLeft: 2,
  paddingRight: 1,
  paddingTop: 1,
  paddingBottom: 2,
  backgroundColor: 'grey.50',
  borderRadius: 3,
});

export default memo(ChatViewMessageIncoming);
