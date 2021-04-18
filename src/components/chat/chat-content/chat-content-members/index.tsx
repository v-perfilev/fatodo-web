import React, {FC, useEffect, useState} from 'react';
import {Chat} from '../../../../models/chat.model';
import {useUserListContext} from '../../../../shared/contexts/list-contexts/user-list-context';
import {User} from '../../../../models/user.model';
import {AvatarGroup} from '../../../common/surfaces';

type Props = {
  chat: Chat;
  openMembersDialog: () => void;
};

const ChatContentMembers: FC<Props> = ({chat, openMembersDialog}: Props) => {
  const {users} = useUserListContext();
  const [usersToShow, setUsersToShow] = useState<User[]>([]);

  useEffect(() => {
    const updatedUsersToShow = users.filter((user) => chat.members.includes(user.id));
    setUsersToShow(updatedUsersToShow);
  }, [chat.members]);

  return <AvatarGroup users={usersToShow} onClick={openMembersDialog} />;
};

export default ChatContentMembers;
