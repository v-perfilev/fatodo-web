import React from 'React';
import {SxProps, Typography} from '@mui/material';
import {CHAT_HEADER_HEIGHT} from '../../../constants';
import {useAppDispatch, useAppSelector} from '../../../store/store';
import AuthSelectors from '../../../store/auth/authSelectors';
import {ChatUtils} from '../../../shared/utils/ChatUtils';
import ChatSelectors from '../../../store/chat/chatSelectors';
import InfoSelectors from '../../../store/info/infoSelectors';
import {useCallback, useMemo} from 'react';
import {useTranslation} from 'react-i18next';
import {ChatActions} from '../../../store/chat/chatActions';
import PageMenu, {PageMenuItem} from '../../../components/layouts/PageMenuProps';
import RefreshIcon from '../../../components/icons/RefreshIcon';
import MembersIcon from '../../../components/icons/MembersIcon';
import UserPlusIcon from '../../../components/icons/UserPlusIcon';
import EditIcon from '../../../components/icons/EditIcon';
import BroomIcon from '../../../components/icons/BroomIcon';
import LeaveIcon from '../../../components/icons/LeaveIcon';
import DeleteIcon from '../../../components/icons/DeleteIcon';
import FHStack from '../../../components/boxes/FHStack';
import AvatarGroup from '../../../components/surfaces/AvatarGroup';

const ChatViewHeader = () => {
  const dispatch = useAppDispatch();
  const usersSelector = useCallback(InfoSelectors.makeUsersSelector(), []);
  const chat = useAppSelector(ChatSelectors.chat);
  const memberIds = chat.members.map((m) => m.userId);
  const users = useAppSelector((state) => usersSelector(state, memberIds));
  const account = useAppSelector(AuthSelectors.account);
  const {t} = useTranslation();

  const title = useMemo<string>(() => {
    return ChatUtils.getTitle(chat, users, account);
  }, [chat, users, account]);

  const refresh = (): void => {
    dispatch(ChatActions.refreshMessagesThunk(chat.id));
  };

  const showMembers = (): void => {
    // showChatMembersDialog(chat);
  };

  const addMembers = (): void => {
    // showChatAddMembersDialog(chat);
  };

  const renameChat = (): void => {
    // showChatRenameDialog(chat);
  };

  const cleanChat = (): void => {
    // showChatClearDialog(chat);
  };

  const leaveChat = (): void => {
    // const onSuccess = () => navigation.goBack();
    // showChatLeaveDialog(chat, onSuccess);
  };

  const deleteChat = (): void => {
    // const onSuccess = () => navigation.goBack();
    // showChatDeleteDialog(chat, onSuccess);
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
      action: leaveChat,
      text: t('chat:menu.leaveChat'),
      icon: <LeaveIcon />,
      color: 'primary',
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
    <FHStack sx={containerStyles}>
      <FHStack spacing={1}>
        <Typography color="primary" fontWeight="bold" fontSize={14}>
          {title}
        </Typography>
        {chat.isDirect && (
          <Typography color="grey.500" fontSize={14}>
            {t('chat:common.direct')}
          </Typography>
        )}
      </FHStack>
      <FHStack flexGrow={0}>
        <AvatarGroup users={users} />
        <PageMenu items={menuItems} compactView />
      </FHStack>
    </FHStack>
  );
};

const containerStyles: SxProps = {
  width: '100%',
  height: CHAT_HEADER_HEIGHT,
  paddingX: 1,
  borderBottomWidth: 1,
  borderBottomStyle: 'solid',
  borderBottomColor: 'grey.300',
};

export default ChatViewHeader;
