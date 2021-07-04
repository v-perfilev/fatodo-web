import React, {FC, useEffect, useState} from 'react';
import {Box} from '@material-ui/core';
import {groupViewUsersStyles} from './_styles';
import {useGroupViewContext} from '../../../shared/contexts/view-contexts/group-view-context';
import {UserWithPopupView} from '../../../components/views';
import {useUserListContext} from '../../../shared/contexts/list-contexts/user-list-context';
import {User} from '../../../models/user.model';

const GroupViewUsers: FC = () => {
  const classes = groupViewUsersStyles();
  const {obj: group} = useGroupViewContext();
  const {users} = useUserListContext();
  const [usersToShow, setUsersToShow] = useState<User[]>([]);

  const updateUsersToShow = (): void => {
    const groupUserIds = group.users.map((user) => user.id);
    const updatedList = users.filter((user) => groupUserIds.includes(user.id));
    setUsersToShow(updatedList);
  };

  useEffect(() => {
    updateUsersToShow();
  }, [users, group]);

  return (
    <Box className={classes.root}>
      {usersToShow.map((user, index) => (
        <UserWithPopupView user={user} withUsername withPaperBox key={index} />
      ))}
    </Box>
  );
};

export default GroupViewUsers;
