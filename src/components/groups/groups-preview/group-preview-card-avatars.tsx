import * as React from 'react';
import {FC} from 'react';
import {Box, Typography} from '@material-ui/core';
import {groupCardAvatarsStyles} from './_styles';
import {AVATARS_IN_GROUP_CARD} from '../_constants';
import RoundPic from '../../common/images/round-pic';
import {Group} from '../../../models/group.model';

type Props = {
  group: Group;
};

const GroupPreviewCardAvatars: FC<Props> = ({group}: Props) => {
  const classes = groupCardAvatarsStyles();

  const usersToShow = group.users.slice(0, AVATARS_IN_GROUP_CARD);
  const moreThanLimit = group.users.length > AVATARS_IN_GROUP_CARD ? group.users.length - AVATARS_IN_GROUP_CARD : 0;

  return (
    <Box className={classes.avatars}>
      {usersToShow.map((user, index) => (
        <RoundPic key={index} alt={user.username} url={user.avatarUrl} color={group.color} border={1} />
      ))}
      {moreThanLimit > 0 && <Typography className={classes.count}>+{moreThanLimit}</Typography>}
    </Box>
  );
};

export default GroupPreviewCardAvatars;
