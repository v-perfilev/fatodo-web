import {Chat} from '../../../models/Chat';
import FHStack from '../../../components/boxes/FHStack';
import {useAppSelector} from '../../../store/store';
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
import {alpha, SxProps, Typography} from '@mui/material';
import BadgeWithoutIcon from '../../../components/icons/badgeIcons/BadgeWithoutIcon';
import ChatListMessage from './chatListMessage/ChatListMessage';
import {Theme} from '@mui/material/styles';

type ChatListItemProps = {
  chat: Chat;
  selectChat: (chat: Chat) => void;
  isSelected: boolean;
};

const ChatListItem = ({chat, selectChat, isSelected}: ChatListItemProps) => {
  const unreadMessageIdsSelector = useCallback(ChatsSelectors.makeUnreadMessageIdsSelector(), []);
  const usersSelector = useCallback(InfoSelectors.makeUsersSelector(), []);
  const {t} = useTranslation();
  const memberIds = chat.members.map((m) => m.userId);
  const unreadMessageIds = useAppSelector((state) => unreadMessageIdsSelector(state, chat.id));
  const users = useAppSelector((state) => usersSelector(state, memberIds));
  const account = useAppSelector(AuthSelectors.account);

  const goToChat = (): void => {
    selectChat(chat);
  };

  const unreadCount = unreadMessageIds.length;
  const directUser = ChatUtils.getDirectChatUser(chat, users, account);
  const title = ChatUtils.getTitle(chat, users, account);
  const date = chat.lastMessage?.createdAt ? new Date(chat.lastMessage.createdAt) : null;

  const pic = directUser ? <UserView user={directUser} /> : <UrlPic url={undefined} />;

  const styles: SxProps = isSelected ? selectedChatStyles : chatStyles;

  return (
    <FHStack sx={styles} spacing={1} onClick={goToChat}>
      {pic}
      <FHStack>
        <FVStack spacing={0.5} alignItems="stretch" justifyContent="center">
          <FHStack spacing={1} alignItems="center">
            <FHStack spacing={1} alignItems="center">
              <Typography color="primary" fontWeight="bold" fontSize={14}>
                {title}
              </Typography>
              {chat.isDirect && (
                <Typography color="grey.500" fontSize={14}>
                  {t('chat:common.direct')}
                </Typography>
              )}
              {unreadCount > 0 && <BadgeWithoutIcon count={unreadCount} color="secondary" />}
            </FHStack>
            <Typography color="grey.500" fontSize={12}>
              <DateView date={date} timeFormat="FULL" dateFormat="DEPENDS_ON_DAY" />
            </Typography>
          </FHStack>
          <ChatListMessage message={chat.lastMessage} account={account} />
        </FVStack>
      </FHStack>
    </FHStack>
  );
};

const chatStyles: SxProps = {
  cursor: 'pointer',
  paddingY: 2,
  paddingX: 1,
  '&:hover': {
    backgroundColor: 'grey.50',
  },
};

const selectedChatStyles: SxProps = (theme: Theme) => ({
  cursor: 'pointer',
  paddingY: 2,
  paddingX: 1,
  backgroundColor: alpha(theme.palette.primary.main, 0.1),
});

export default ChatListItem;
