import React, {FC, useEffect, useState} from 'react';
import {Box} from '@material-ui/core';
import {groupViewUsersStyles} from './_styles';
import {User} from '../../../models/user.model';
import UserService from '../../../services/user.service';
import {useSnackContext} from '../../../shared/contexts/snack-context';
import {useGroupViewContext} from '../../../shared/contexts/view-contexts/group-view-context';
import {UserWithPopupView} from '../../common/views/user-with-popup-view';

const GroupViewUsers: FC = () => {
  const classes = groupViewUsersStyles();
  const {handleResponse} = useSnackContext();
  const {obj: group} = useGroupViewContext();
  const [users, setUsers] = useState<User[]>([]);

  const loadUsers = (ids: string[]): void => {
    UserService.getAllByIds(ids)
      .then((response) => {
        setUsers(response.data);
      })
      .catch((response) => {
        handleResponse(response);
      });
  };

  useEffect(() => {
    const ids = group.users.map((u) => u.id);
    loadUsers(ids);
  }, []);

  return (
    <Box className={classes.root}>
      {users.map((user, index) => (
        <UserWithPopupView user={user} withUsername withPaperBox key={index} />
      ))}
    </Box>
  );
};

export default GroupViewUsers;
