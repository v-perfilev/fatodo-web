import * as React from 'react';
import {FC, useState} from 'react';
import {Box, Typography} from '@material-ui/core';
import {groupCardAvatarsStyles} from './_styles';
import {AVATARS_IN_GROUP_CARD} from '../_constants';
import Index from '../../common/images';
import {GroupUser} from '../../../models/group.model';
import {User} from '../../../models/user.model';

type Props = {
  groupUsers: GroupUser[];
};

const GroupPreviewCardAvatars: FC<Props> = ({groupUsers}: Props) => {
  const classes = groupCardAvatarsStyles();
  const [users, setUsers] = useState<User[]>([]);

  const usersToShow = users.slice(0, AVATARS_IN_GROUP_CARD);
  const moreThanLimit = users.length > AVATARS_IN_GROUP_CARD ? users.length - AVATARS_IN_GROUP_CARD : 0;

  return (
    <Box className={classes.avatars}>
      {usersToShow.map((user, index) => (
        <Index key={index} alt={user.username} url={user.imageFilename} border={1} />
      ))}
      {moreThanLimit > 0 && <Typography className={classes.count}>+{moreThanLimit}</Typography>}
    </Box>
  );
};

export default GroupPreviewCardAvatars;
