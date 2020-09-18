import * as React from 'react';
import {FC} from 'react';
import {Box, Typography} from '@material-ui/core';
import {groupCardAvatarsStyles} from './_styles';
import {AVATARS_IN_GROUP_CARD} from '../_constants';
import {User} from '../../../models/user.model';
import RoundPic from '../../common/images/round-pic';

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
        <RoundPic key={index} alt={user.username} url={user.avatarUrl} />
      ))}
      {moreThanLimit > 0 && <Typography className={classes.count}>+{moreThanLimit}</Typography>}
    </Box>
  );
};

export default GroupPreviewCardAvatars;
