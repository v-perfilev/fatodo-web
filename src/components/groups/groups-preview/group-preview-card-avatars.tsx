import * as React from 'react';
import {FC} from 'react';
import {Box, Typography} from '@material-ui/core';
import {groupCardAvatarsStyles} from './_styles';
import {AVATARS_IN_GROUP_CARD} from '../_constants';
import {User} from '../../../models/user';
import Userpic from '../../common/userpic';

type Props = {
  users: User[];
};

const GroupPreviewCardAvatars: FC<Props> = ({users}: Props) => {
  const classes = groupCardAvatarsStyles();

  const usersToShow = users.slice(0, AVATARS_IN_GROUP_CARD);
  const moreThanLimit = users.length;

  return (
    <Box className={classes.avatars}>
      {usersToShow.map((user, index) => (
        <Userpic key={index} user={user} />
      ))}
      {!!moreThanLimit && <Typography className={classes.count}>+{moreThanLimit}</Typography>}
    </Box>
  );
};

export default GroupPreviewCardAvatars;
