import * as React from 'react';
import {FC} from 'react';
import {Box, Typography} from '@material-ui/core';
import {groupCardAvatarsStyles} from './_styles';
import {AVATARS_IN_GROUP_CARD} from '../_constants';
import RoundPic from '../../common/images/round-pic';
import {User} from '../../../models/user.model';

type Props = {
  users: User[];
};

const GroupPreviewCardAvatars: FC<Props> = ({users}: Props) => {
  const classes = groupCardAvatarsStyles();

  const usersToShow = users.slice(0, AVATARS_IN_GROUP_CARD);
  const moreThanLimit = users.length > AVATARS_IN_GROUP_CARD ? users.length - AVATARS_IN_GROUP_CARD : 0;

  return (
    <Box className={classes.avatars}>
      {usersToShow.map((user, index) => (
        <RoundPic key={index} alt={user.username} url={user.avatarUrl} border={1} />
      ))}
      {moreThanLimit > 0 && <Typography className={classes.count}>+{moreThanLimit}</Typography>}
    </Box>
  );
};

export default GroupPreviewCardAvatars;
