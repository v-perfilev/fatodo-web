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

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const value = e.target.value;
    const updatedUsersToShow = users.filter((u) => u.username.includes(value));
    setUsersToShow(updatedUsersToShow);
  };

  useEffect(() => {
    if (chat) {
      setUsersToShow(users);
    }
  }, [chat, users]);

  const content = (
    <FVStack>
      <ClearableTextInput placeholder={t('inputs.filter')} onChange={handleChange} />
      {usersToShow.length > 0 && (
        <FVStack>
          {usersToShow.map((user) => (
            <ChatMembersDialogMember chat={chat} user={user} key={user.id} />
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

  return <ModalDialog open={show} close={close} title={t('chat:members.title')} content={content} actions={actions} />;
};

export default memo(ChatMembersDialog);
