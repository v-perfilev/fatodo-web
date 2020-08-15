import React, {FC} from 'react';
import {Box} from '@material-ui/core';
import {groupUsersStyles} from './_styles';
import {User} from '../../../models/user';
import PaperBox from '../../common/page-layouts/paper-box';

type Props = {
  users: User[];
}

const GroupViewUsers: FC<Props> = ({users}: Props) => {
  const classes = groupUsersStyles();

  return (
    <Box className={classes.root}>
      {users.map((user, index) => (
        <PaperBox text={user.username} key={index} />
      ))}
    </Box>
  );
};

export default GroupViewUsers;
