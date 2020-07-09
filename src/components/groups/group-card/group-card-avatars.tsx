import * as React from 'react';
import {FC} from 'react';
import {Avatar, Box, Typography} from '@material-ui/core';
import {groupCardAvatarsStyles} from './_styles';
import {AVATARS_IN_GROUP_CARD} from '../_constants';

type Props = {
  users: string[];
}

const GroupCardAvatars: FC<Props> = ({users}: Props) => {
  const classes = groupCardAvatarsStyles();

  const usersToShow = users.slice(0, AVATARS_IN_GROUP_CARD);
  const moreThanLimit = users.length;

  return (
    <Box className={classes.avatars}>
      {usersToShow.map((user, index) => (
        <Avatar key={index} alt={user} src={user} />
      ))}
      {!!moreThanLimit && <Typography className={classes.count}>+{moreThanLimit}</Typography>}
    </Box>
  );
};

export default GroupCardAvatars;
