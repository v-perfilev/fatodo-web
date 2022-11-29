import {Chat} from '../../../models/Chat';
import FHStack from '../../../components/boxes/FHStack';
import {useAppDispatch, useAppSelector} from '../../../store/store';
import InfoSelectors from '../../../store/info/infoSelectors';
import React, {useCallback} from 'react';
import {ChatUtils} from '../../../shared/utils/ChatUtils';
import UserView from '../../../components/views/UserView';
import {useTranslation} from 'react-i18next';
import ChatsSelectors from '../../../store/chats/chatsSelectors';
import AuthSelectors from '../../../store/auth/authSelectors';
import FVStack from '../../../components/boxes/FVStack';
import DateView from '../../../components/views/DateView';
import UrlPic from '../../../components/images/UrlPic';
import {alpha, Box, SxProps, Typography} from '@mui/material';
import BadgeWithoutIcon from '../../../components/icons/badgeIcons/BadgeWithoutIcon';
import ChatListMessage from './chatListMessage/ChatListMessage';
import {Theme} from '@mui/material/styles';
import {ChatActions} from '../../../store/chat/chatActions';
import FBox from '../../../components/boxes/FBox';
import TruncatedTypography from '../../../components/surfaces/TruncatedTypography';

type ChatListItemProps = {
  chat: Chat;
  isSelected: boolean;
};

const ChatListItem = ({chat, isSelected}: ChatListItemProps) => {
  const dispatch = useAppDispatch();
  const unreadMessageIdsSelector = useCallback(ChatsSelectors.makeUnreadMessageIdsSelector(), []);
  const usersSelector = useCallback(InfoSelectors.makeUsersSelector(), []);
  const memberIds = chat.members.map((m) => m.userId);
  const unreadMessageIds = useAppSelector((state) => unreadMessageIdsSelector(state, chat.id));
  const users = useAppSelector((state) => usersSelector(state, memberIds));
  const account = useAppSelector(AuthSelectors.account);
  const {t} = useTranslation();

  const goToChat = (): void => {
    !isSelected && dispatch(ChatActions.fetchChatThunk(chat.id));
  };

  const unreadCount = unreadMessageIds.length;
  const directUser = ChatUtils.getDirectChatUser(chat, users, account);
  const title = ChatUtils.getTitle(chat, users, account) || t('common:links.userDeleted');
  const date = chat.lastMessage?.createdAt ? new Date(chat.lastMessage.createdAt) : null;

  const pic = directUser ? <UserView user={directUser} /> : <UrlPic url={undefined} />;

  const styles: SxProps = isSelected ? selectedChatStyles : chatStyles;

  return (
    <FBox sx={containerStyles}>
      <FHStack sx={styles} spacing={1} onClick={goToChat}>
        {pic}
        <FVStack spacing={0.5} alignItems="stretch" justifyContent="center">
          <FHStack spacing={1}>
            <FHStack spacing={1}>
              <TruncatedTypography color="primary" fontWeight="bold" fontSize={14}>
                {title}
              </TruncatedTypography>
              {chat.isDirect && (
                <Typography color="grey.500" fontSize={14}>
                  {t('chat:common.direct')}
                </Typography>
              )}
              {unreadCount > 0 && (
                <Box sx={badgeContainerStyles}>
                  <BadgeWithoutIcon count={unreadCount} color="secondary" />
                </Box>
              )}
            </FHStack>
            <Typography color="grey.500" fontSize={12} whiteSpace="nowrap">
              <DateView date={date} timeFormat="FULL" dateFormat="DEPENDS_ON_DAY" />
            </Typography>
          </FHStack>
          <ChatListMessage message={chat.lastMessage} account={account} />
        </FVStack>
      </FHStack>
    </FBox>
  );
};

const containerStyles: SxProps = {
  paddingY: 0.5,
};

const chatStyles: SxProps = {
  cursor: 'pointer',
  padding: 1,
  borderRadius: 3,
  '&:hover': {
    backgroundColor: 'grey.50',
  },
};

const badgeContainerStyles: SxProps = {
  paddingX: 1,
};

const selectedChatStyles: SxProps = (theme: Theme) => ({
  cursor: 'pointer',
  padding: 1,
  borderRadius: 3,
  backgroundColor: alpha(theme.palette.primary.main, 0.1),
});

export default ChatListItem;
