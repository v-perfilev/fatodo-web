import React, {ChangeEvent, FC, useEffect, useState} from 'react';
import {Chat} from '../../../../models/chat.model';
import {useTranslation} from 'react-i18next';
import ModalDialog from '../../../../components/dialogs/ModalDialog';
import {User} from '../../../../models/user.model';
import {Box, Button} from '@material-ui/core';
import {ClearableTextInput} from '../../../../components/inputs';
import {chatMembersDialogStyles} from './_styles';
import ChatMembersDialogMember from './chat-members-dialog-member';
import {UserPlusIcon} from '../../../../components/icons/UserPlusIcon';

export type ChatMembersDialogProps = {
  chat: Chat;
  users: User[];
  show: boolean;
  close: () => void;
  switchToAddMembers: () => void;
};

export const defaultChatMembersDialogProps: Readonly<ChatMembersDialogProps> = {
  chat: null,
  users: [],
  show: false,
  close: (): void => undefined,
  switchToAddMembers: (): void => undefined,
};

type Props = ChatMembersDialogProps;

const ChatMembersDialog: FC<Props> = ({chat, users, show, close, switchToAddMembers}: Props) => {
  const classes = chatMembersDialogStyles();
  const {t} = useTranslation();
  const [usersToShow, setUsersToShow] = useState<User[]>([]);

  const filterUsersToShow = (event: ChangeEvent<HTMLInputElement>): void => {
    const filter = event.target.value;
    const updatedUsersToShow = users.filter((user) => chat.members.includes(user.id) && user.username.includes(filter));
    setUsersToShow(updatedUsersToShow);
  };

  useEffect(() => {
    if (chat) {
      const updatedUsersToShow = users.filter((user) => chat.members.includes(user.id));
      setUsersToShow(updatedUsersToShow);
    }
  }, [chat, users]);

  const filter = (
    <Box className={classes.filter}>
      <ClearableTextInput placeholder={t('inputs.filter')} onChange={filterUsersToShow} fullWidth />
    </Box>
  );

  const userList = (
    <Box className={classes.users}>
      {usersToShow.map((user) => (
        <ChatMembersDialogMember chat={chat} user={user} key={user.id} />
      ))}
      {usersToShow.length === 0 && <Box className={classes.notFound}>{t('chat:members.usersNotFound')}</Box>}
    </Box>
  );

  const content = (
    <>
      {filter}
      {userList}
    </>
  );

  const actions = chat && !chat.isDirect && (
    <Button startIcon={<UserPlusIcon />} onClick={switchToAddMembers} color="primary">
      {t('chat:members.buttons.addUsers')}
    </Button>
  );

  return (
    <ModalDialog
      isOpen={show}
      close={close}
      title={t('chat:members.title')}
      content={content}
      actions={actions}
      showCloseIcon
    />
  );
};

export default ChatMembersDialog;
