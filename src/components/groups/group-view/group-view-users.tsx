import React, {FC, useEffect, useState} from 'react';
import {Box} from '@material-ui/core';
import {groupUsersStyles} from './_styles';
import {User} from '../../../models/user.model';
import {GroupUser} from '../../../models/group.model';
import {PaperBox} from '../../common/layouts/paper-box';
import UserService from '../../../services/user.service';
import {Routes} from '../../router';
import {useHistory} from 'react-router-dom';

type Props = {
  groupUsers: GroupUser[];
};

const GroupViewUsers: FC<Props> = ({groupUsers}: Props) => {
  const classes = groupUsersStyles();
  const history = useHistory();
  const [users, setUsers] = useState<User[]>([]);

  const redirectToGroups = (): void => history.push(Routes.GROUPS);

  useEffect(() => {
    const ids = groupUsers.map(u => u.id);
    UserService.getAllByIds(ids)
      .then((response) => {
        setUsers(response.data);
      })
      .catch(() => {
        redirectToGroups();
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
