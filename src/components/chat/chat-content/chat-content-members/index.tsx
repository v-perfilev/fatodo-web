import React, {FC, useEffect, useState} from 'react';
import {Chat} from '../../../../models/chat.model';
import {useUserListContext} from '../../../../shared/contexts/list-contexts/user-list-context';
import {User} from '../../../../models/user.model';
import {AvatarGroup} from '../../../common/surfaces';
import {ChatDialogs} from '../../_router';
import {useDialogsContext} from '../../../../shared/contexts/dialogs-context';
import {ChatMembersDialogProps} from '../../dialogs/chat-members-dialog';
import {ChatAddMembersDialogProps} from '../../dialogs/chat-add-members-dialog';

type Props = {
  chat: Chat;
};

const ChatContentMembers: FC<Props> = ({chat}: Props) => {
  const {users} = useUserListContext();
  const {setDialogProps, clearDialogProps} = useDialogsContext();
  const [usersToShow, setUsersToShow] = useState<User[]>([]);

  const showChatAddMembersDialog = (): void => {
    const close = (): void => clearDialogProps(ChatDialogs.ADD_MEMBERS);
    const props = {chat, close} as ChatAddMembersDialogProps;
    setDialogProps(ChatDialogs.ADD_MEMBERS, props);
  };

  const showChatMembersDialog = (): void => {
    const close = (): void => clearDialogProps(ChatDialogs.MEMBERS);
    const switchToAddMembers = (): void => {
      clearDialogProps(ChatDialogs.MEMBERS);
      showChatAddMembersDialog();
    };
    const props = {chat, users, close, switchToAddMembers} as ChatMembersDialogProps;
    setDialogProps(ChatDialogs.MEMBERS, props);
  };

  useEffect(() => {
    const updatedUsersToShow = users.filter((user) => chat.members.includes(user.id));
    setUsersToShow(updatedUsersToShow);
  }, [chat.members]);

  return <AvatarGroup users={usersToShow} onClick={showChatMembersDialog} />;
};

export default ChatContentMembers;
