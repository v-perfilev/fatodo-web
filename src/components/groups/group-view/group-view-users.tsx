import React, {FC, useEffect, useState} from 'react';
import {Box} from '@material-ui/core';
import {groupViewUsersStyles} from './_styles';
import {User} from '../../../models/user.model';
import {PaperBox} from '../../common/surfaces/paper-box';
import UserService from '../../../services/user.service';
import {useSnackContext} from '../../../shared/contexts/snack-context';
import {useGroupViewContext} from '../../../shared/contexts/group-view-context';

const GroupViewUsers: FC = () => {
  const classes = groupViewUsersStyles();
  const {handleResponse} = useSnackContext();
  const {group} = useGroupViewContext();
  const [users, setUsers] = useState<User[]>([]);

  useEffect(() => {
    const ids = group.users.map((u) => u.id);
    UserService.getAllByIds(ids)
      .then((response) => {
        setUsers(response.data);
      })
      .catch((response) => {
        handleResponse(response);
      });
  }, []);

  return (
    <Box className={classes.root}>
      {users.map((user, index) => (
        <PaperBox key={index}>{user.username}</PaperBox>
      ))}
    </Box>
  );
};

export default GroupViewUsers;
