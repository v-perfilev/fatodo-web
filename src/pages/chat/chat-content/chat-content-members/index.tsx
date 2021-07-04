import React, {FC, useEffect, useState} from 'react';
import {Chat} from '../../../../models/chat.model';
import {useUserListContext} from '../../../../shared/contexts/list-contexts/user-list-context';
import {User} from '../../../../models/user.model';
import {AvatarGroup} from '../../../../components/surfaces';
import {useChatDialogContext} from '../../../../shared/contexts/dialog-contexts/chat-dialog-context';

type Props = {
  chat: Chat;
};

const ChatContentMembers: FC<Props> = ({chat}: Props) => {
  const {users} = useUserListContext();
  const [usersToShow, setUsersToShow] = useState<User[]>([]);
  const {showChatMembersDialog} = useChatDialogContext();

  const openChatMembersDialog = (): void => {
    showChatMembersDialog(chat, users);
  };

  useEffect(() => {
    const updatedUsersToShow = users.filter((user) => chat.members.includes(user.id));
    setUsersToShow(updatedUsersToShow);
  }, [chat.members, users]);

  return <AvatarGroup users={usersToShow} onClick={openChatMembersDialog} />;
};

export default ChatContentMembers;
