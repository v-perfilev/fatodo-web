import React, {FC, useEffect, useState} from 'react';
import {AvatarGroup} from '../../../components/surfaces';
import {useGroupViewContext} from '../../../shared/contexts/view-contexts/group-view-context';
import {User} from '../../../models/user.model';
import {useUserListContext} from '../../../shared/contexts/list-contexts/user-list-context';
import {groupsPreviewCardAvatarsStyles} from './_styles';
import {Box} from '@material-ui/core';

const GroupsPreviewCardAvatars: FC = () => {
  const classes = groupsPreviewCardAvatarsStyles();
  const {users} = useUserListContext();
  const {group} = useGroupViewContext();
  const [usersToShow, setUsersToShow] = useState<User[]>([]);

  const updateUsersToShow = (): void => {
    const groupUserIds = group.members.map((user) => user.id);
    const updatedList = users.filter((user) => groupUserIds.includes(user.id));
    setUsersToShow(updatedList);
  };

  useEffect(() => {
    updateUsersToShow();
  }, [users, group]);

  return (
    <Box className={classes.root}>
      <AvatarGroup users={usersToShow} withPopup withInvertedBorder />
    </Box>
  );
};

export default GroupsPreviewCardAvatars;
