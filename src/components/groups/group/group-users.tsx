import React, {FC} from 'react';
import {Box, Paper, Typography} from '@material-ui/core';
import {groupUsersStyles} from './_styles';
import {User} from '../../../models/user';

type Props = {
  users: User[];
}

const GroupUsers: FC<Props> = ({users}: Props) => {
  const classes = groupUsersStyles();

  return (
    <Box className={classes.root}>
      {users.map((user, index) => (
        <Paper square className={classes.user}>
          <Typography variant="body2">{user.username}</Typography>
        </Paper>
      ))}
    </Box>
  );
};

export default GroupUsers;
