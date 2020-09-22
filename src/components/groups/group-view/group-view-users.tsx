import React, {FC, useEffect, useState} from 'react';
import {Box} from '@material-ui/core';
import {groupUsersStyles} from './_styles';
import {User} from '../../../models/user.model';
import PaperBox from '../../common/layout-page/paper-box';
import {GroupUser} from '../../../models/group.model';

type Props = {
  groupUsers: GroupUser[];
};

const GroupViewUsers: FC<Props> = ({groupUsers}: Props) => {
  const classes = groupUsersStyles();
  const [users, setUsers] = useState<User[]>([]);

  useEffect(() => {
    // TODO set users
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
