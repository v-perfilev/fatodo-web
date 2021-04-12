import React, {FC, useEffect, useState} from 'react';
import {Chat} from '../../../../models/chat.model';
import ChatMembersDialog from '../../dialogs/chat-members-dialog';
import ChatAddMembersDialog from '../../dialogs/chat-add-members-dialog';
import {useUserListContext} from '../../../../shared/contexts/list-contexts/user-list-context';
import {User} from '../../../../models/user.model';
import {AvatarGroup} from '../../../common/surfaces';

type Props = {
  chat: Chat;
};

export type ContentMemberDialogType = 'members' | 'add-members' | 'none';

const ChatContentMembers: FC<Props> = ({chat}: Props) => {
  const [dialog, setDialog] = useState<ContentMemberDialogType>('none');
  const {users} = useUserListContext();
  const [usersToShow, setUsersToShow] = useState<User[]>([]);

  const isListDialogOpened = dialog === 'members';
  const isAddDialogOpened = dialog === 'add-members';

  const openMembersDialog = (): void => {
    setDialog('members');
  };

  const openAddMembersDialog = (): void => {
    setDialog('add-members');
  };

  const closeDialog = (): void => {
    setDialog('none');
  };

  useEffect(() => {
    const updatedUsersToShow = users.filter((user) => chat.members.includes(user.id));
    setUsersToShow(updatedUsersToShow);
  }, [chat.members]);

  return (
    <>
      <AvatarGroup users={usersToShow} onClick={openMembersDialog} />
      <ChatMembersDialog
        chat={chat}
        isOpen={isListDialogOpened}
        close={closeDialog}
        switchToAddMembers={openAddMembersDialog}
      />
      <ChatAddMembersDialog
        chat={chat}
        isOpen={isAddDialogOpened}
        close={closeDialog}
        switchToMembers={openAddMembersDialog}
      />
    </>
  );
};

export default ChatContentMembers;
