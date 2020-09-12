import React, {FC} from 'react';
import {Box} from '@material-ui/core';
import {groupUsersStyles} from './_styles';
import {User} from '../../../models/user.model';
import PaperBox from '../../common/layout-page/paper-box';

type Props = {
  users: User[];
};

const GroupViewUsers: FC<Props> = ({users}: Props) => {
  const classes = groupUsersStyles();

  return (
    <Box className={classes.root}>
      {users.map((user, index) => (
        <PaperBox key={index}>{user.username}</PaperBox>
      ))}
    </Box>
  );
};

export default GroupViewUsers;
