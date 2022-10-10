import React, {FC, useEffect, useState} from 'react';
import {Box} from '@material-ui/core';
import {groupViewUsersStyles} from './_styles';
import {useGroupViewContext} from '../../../shared/contexts/view-contexts/group-view-context';
import {UserWithPopupView} from '../../../components/views';
import {useUserListContext} from '../../../shared/contexts/list-contexts/user-list-context';
import {User} from '../../../models/user.model';
import GroupViewSkeletonUsers from './group-view-skeleton/group-view-skeleton-users';
import {useLoadingState} from '../../../shared/hooks/use-loading-state';

const GroupViewUsers: FC = () => {
  const classes = groupViewUsersStyles();
  const {group} = useGroupViewContext();
  const {users} = useUserListContext();
  const [usersToShow, setUsersToShow] = useState<User[]>([]);
  const [loading, setLoading] = useLoadingState();

  const updateUsersToShow = (): void => {
    const groupUserIds = group.members.map((user) => user.id);
    const updatedList = users.filter((user) => groupUserIds.includes(user.id));
    setUsersToShow(updatedList);
  };

  useEffect(() => {
    if (group && users) {
      updateUsersToShow();
    }
  }, [users]);

  useEffect(() => {
    if (usersToShow.length > 0) {
      setLoading(false);
    }
  }, [usersToShow]);

  return (
    <Box className={classes.root}>
      {loading && <GroupViewSkeletonUsers />}
      {!loading && usersToShow.map((user) => <UserWithPopupView user={user} withUsername withPaperBox key={user.id} />)}
    </Box>
  );
};

export default GroupViewUsers;
