import React, {ChangeEvent, FC, useEffect, useState} from 'react';
import {Chat} from '../../../../models/chat.model';
import {useTranslation} from 'react-i18next';
import {useUserListContext} from '../../../../shared/contexts/list-contexts/user-list-context';
import ModalDialog from '../../../common/dialogs/modal-dialog';
import {User} from '../../../../models/user.model';
import {Box, Button} from '@material-ui/core';
import {ClearableTextInput} from '../../../common/inputs';
import {chatMembersDialogStyles} from './_styles';
import ChatMembersDialogMember from './chat-members-dialog-member';
import {UserPlusIcon} from '../../../common/icons/user-plus-icon';

type Props = {
  chat: Chat;
  isOpen: boolean;
  close: () => void;
  switchToAddMembers: () => void;
};

const ChatMembersDialog: FC<Props> = ({chat, isOpen, close, switchToAddMembers}: Props) => {
  const classes = chatMembersDialogStyles();
  const {users} = useUserListContext();
  const {t} = useTranslation();
  const [usersToShow, setUsersToShow] = useState<User[]>([]);

  const filterUsersToShow = (event: ChangeEvent<HTMLInputElement>): void => {
    const filter = event.target.value;
    const updatedUsersToShow = users.filter((user) => chat.members.includes(user.id) && user.username.includes(filter));
    setUsersToShow(updatedUsersToShow);
  };

  useEffect(() => {
    const updatedUsersToShow = users.filter((user) => chat.members.includes(user.id));
    setUsersToShow(updatedUsersToShow);
  }, [chat.members]);

  const filter = (
    <Box className={classes.filter}>
      <ClearableTextInput placeholder={t('inputs.filter')} onChange={filterUsersToShow} fullWidth />
    </Box>
  );

  const userList = (
    <Box className={classes.users}>
      {usersToShow.map((user, index) => (
        <ChatMembersDialogMember chat={chat} user={user} key={index} />
      ))}
      {usersToShow.length === 0 && (
        <Box className={classes.notFound}>
          {t('common:members.usersNotFound')}
        </Box>
      )}
    </Box>
  );

  const content = (
    <>
      {filter}
      {userList}
    </>
  );

  const actions = !chat.isDirect && (
    <Button startIcon={<UserPlusIcon />} onClick={switchToAddMembers} color="primary">
      {t('chat:members.buttons.addUsers')}
    </Button>
  );

  return (
    <ModalDialog
      isOpen={isOpen}
      close={close}
      title={t('chat:members.title')}
      content={content}
      actions={actions}
      showCloseIcon
    />
  );
};

export default ChatMembersDialog;
