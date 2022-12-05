import React, {useCallback, useMemo} from 'react';
import {Hidden, IconButton, SxProps, Typography} from '@mui/material';
import {useAppDispatch, useAppSelector} from '../../../store/store';
import AuthSelectors from '../../../store/auth/authSelectors';
import {ChatUtils} from '../../../shared/utils/ChatUtils';
import ChatSelectors from '../../../store/chat/chatSelectors';
import InfoSelectors from '../../../store/info/infoSelectors';
import {useTranslation} from 'react-i18next';
import {ChatActions} from '../../../store/chat/chatActions';
import PageMenu, {PageMenuItem} from '../../../components/layouts/PageMenu';
import RefreshIcon from '../../../components/icons/RefreshIcon';
import MembersIcon from '../../../components/icons/MembersIcon';
import UserPlusIcon from '../../../components/icons/UserPlusIcon';
import EditIcon from '../../../components/icons/EditIcon';
import BroomIcon from '../../../components/icons/BroomIcon';
import LeaveIcon from '../../../components/icons/LeaveIcon';
import DeleteIcon from '../../../components/icons/DeleteIcon';
import FHStack from '../../../components/boxes/FHStack';
import AvatarGroup from '../../../components/surfaces/AvatarGroup';
import PageHeader from '../../../components/layouts/PageHeader';
import {useChatDialogContext} from '../../../shared/contexts/dialogContexts/ChatDialogContext';
import CloseIcon from '../../../components/icons/CloseIcon';
import TruncatedTypography from '../../../components/surfaces/TruncatedTypography';
import ChatsSelectors from '../../../store/chats/chatsSelectors';
import EyeIcon from '../../../components/icons/EyeIcon';

const ChatViewHeader = () => {
  const dispatch = useAppDispatch();
  const unreadMessageIdsSelector = useCallback(ChatsSelectors.makeUnreadMessageIdsSelector(), []);
  const usersSelector = useCallback(InfoSelectors.makeUsersSelector(), []);
  const chat = useAppSelector(ChatSelectors.chat);
  const unreadMessageIds = useAppSelector((state) => unreadMessageIdsSelector(state, chat?.id));
  const memberIds = chat.members.map((m) => m.userId);
  const users = useAppSelector((state) => usersSelector(state, memberIds));
  const account = useAppSelector(AuthSelectors.account);
  const {
    showChatMembersDialog,
    showChatAddMembersDialog,
    showChatRenameDialog,
    showChatClearDialog,
    showChatLeaveDialog,
    showChatDeleteDialog,
  } = useChatDialogContext();
  const {t} = useTranslation();

  const showMarkAsRead = useMemo<boolean>(() => {
    return unreadMessageIds?.length > 0;
  }, [chat, unreadMessageIds]);

  const title = useMemo<string>(() => {
    return ChatUtils.getTitle(chat, users, account);
  }, [chat, users, account]);

  const closeChat = (): void => {
    dispatch(ChatActions.reset());
  };

  const refresh = (): void => {
    dispatch(ChatActions.refreshMessagesThunk(chat.id));
  };

  const showMembers = (): void => {
    showChatMembersDialog(chat);
  };

  const addMembers = (): void => {
    showChatAddMembersDialog(chat);
  };

  const renameChat = (): void => {
    showChatRenameDialog(chat);
  };

  const cleanChat = (): void => {
    showChatClearDialog(chat);
  };

  const markAsRead = (): void => {
    dispatch(ChatActions.markChatAsReadThunk(chat));
  };

  const leaveChat = (): void => {
    showChatLeaveDialog(chat, closeChat);
  };

  const deleteChat = (): void => {
    showChatDeleteDialog(chat, closeChat);
  };

  const menuItems: PageMenuItem[] = [
    {action: refresh, text: t('chat:menu.refresh'), icon: <RefreshIcon />, color: 'primary'},
    {action: showMembers, text: t('chat:menu.showMembers'), icon: <MembersIcon />, color: 'primary'},
    {
      action: addMembers,
      text: t('chat:menu.addMembers'),
      icon: <UserPlusIcon />,
      color: 'primary',
      hidden: chat.isDirect,
    },
    {
      action: renameChat,
      text: t('chat:menu.renameChat'),
      icon: <EditIcon />,
      color: 'primary',
      hidden: chat.isDirect,
    },
    {action: cleanChat, text: t('chat:menu.cleanChat'), icon: <BroomIcon />, color: 'primary'},
    {
      action: markAsRead,
      text: t('chat:menu.markAsRead'),
      icon: <EyeIcon />,
      color: 'primary',
      hidden: !showMarkAsRead,
    },
    {
      action: leaveChat,
      text: t('chat:menu.leaveChat'),
      icon: <LeaveIcon />,
      color: 'error',
      hidden: chat.isDirect,
    },
    {
      action: deleteChat,
      text: t('chat:menu.deleteChat'),
      icon: <DeleteIcon />,
      color: 'error',
      hidden: chat.isDirect,
    },
  ];

  return (
    <PageHeader position="absolute">
      <FHStack spacing={1}>
        <IconButton sx={closeButtonStyles} onClick={closeChat}>
          <CloseIcon />
        </IconButton>
        <TruncatedTypography color="primary" fontWeight="bold" fontSize={14}>
          {title}
        </TruncatedTypography>
        {chat.isDirect && (
          <Typography color="grey.500" fontSize={14}>
            {t('chat:common.direct')}
          </Typography>
        )}
      </FHStack>
      <FHStack flexGrow={0}>
        <Hidden mdDown>
          <AvatarGroup users={users} />
        </Hidden>
        <PageMenu items={menuItems} compactView />
      </FHStack>
    </PageHeader>
  );
};

const closeButtonStyles: SxProps = {
  marginLeft: -1,
};

export default ChatViewHeader;
