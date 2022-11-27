import React, {memo, useCallback, useEffect, useMemo, useState} from 'react';
import {useTranslation} from 'react-i18next';
import ClearableTextInput from '../../../../components/inputs/ClearableTextInput';
import UserPlusIcon from '../../../../components/icons/UserPlusIcon';
import ModalDialog from '../../../../components/modals/ModalDialog';
import FVStack from '../../../../components/boxes/FVStack';
import FCenter from '../../../../components/boxes/FCenter';
import {Chat} from '../../../../models/Chat';
import ChatMembersDialogMember from './ChatMembersDialogMember';
import {useAppSelector} from '../../../../store/store';
import InfoSelectors from '../../../../store/info/infoSelectors';
import {User} from '../../../../models/User';
import {Button, Typography} from '@mui/material';

export type ChatMembersDialogProps = {
  chat: Chat;
  show: boolean;
  close: () => void;
  switchToAddMembers: () => void;
};

export const defaultChatMembersDialogProps: Readonly<ChatMembersDialogProps> = {
  chat: null,
  show: false,
  close: (): void => null,
  switchToAddMembers: (): void => null,
};

const ChatMembersDialog = ({chat, show, close, switchToAddMembers}: ChatMembersDialogProps) => {
  const usersSelector = useCallback(InfoSelectors.makeUsersSelector(), []);
  const memberIds = useMemo(() => chat?.members.map((m) => m.userId), [chat]);
  const users = useAppSelector((state) => usersSelector(state, memberIds));
  const {t} = useTranslation();
  const [usersToShow, setUsersToShow] = useState<User[]>([]);
  const [deletedMemberIds, setDeletedMemberIds] = useState<string[]>([]);

  const conditionalClose = (): void => {
    if (deletedMemberIds.length >= 0) {
      setDeletedMemberIds([]);
    }
    close();
  };

  const updateUsersToShow = (filter?: string): void => {
    const updatedUsersToShow = users
      .filter((user) => !deletedMemberIds.includes(user.id))
      .filter((user) => filter === undefined || user.username.includes(filter));
    setUsersToShow(updatedUsersToShow);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const value = e.target.value;
    updateUsersToShow(value);
  };

  const onMemberDelete = (userId: string): void => {
    setDeletedMemberIds((prevState) => [...prevState, userId]);
  };

  useEffect(() => {
    if (chat) {
      updateUsersToShow();
    }
  }, [chat, users]);

  const content = (
    <FVStack>
      <ClearableTextInput placeholder={t('inputs.filter')} onChange={handleChange} />
      {usersToShow.length > 0 && (
        <FVStack>
          {usersToShow.map((user) => (
            <ChatMembersDialogMember chat={chat} user={user} onDelete={onMemberDelete} key={user.id} />
          ))}
        </FVStack>
      )}
      {usersToShow.length === 0 && (
        <FCenter>
          <Typography fontSize={14} color="grey.400">
            {t('chat:members.usersNotFound')}
          </Typography>
        </FCenter>
      )}
    </FVStack>
  );

  const actions = chat && !chat.isDirect && (
    <Button variant="text" startIcon={<UserPlusIcon />} color="primary" onClick={switchToAddMembers}>
      {t('chat:members.buttons.addUsers')}
    </Button>
  );

  return (
    <ModalDialog
      open={show}
      close={conditionalClose}
      title={t('chat:members.title')}
      content={content}
      actions={actions}
    />
  );
};

export default memo(ChatMembersDialog);
