import React from 'react';
import {User} from '../../models/User';
import {AVATARS_IN_CARD} from '../../constants';
import UserView from '../views/UserView';
import FHStack from '../boxes/FHStack';
import {Box, Typography} from '@mui/material';

type AvatarGroupProps = {
  users: User[];
};

const AvatarGroup = ({users}: AvatarGroupProps) => {
  const usersToShow = users.slice(0, AVATARS_IN_CARD);
  const moreThanLimit = users.length > AVATARS_IN_CARD ? users.length - AVATARS_IN_CARD : 0;

  return (
    <FHStack spacing={1} flexGrow={0}>
      <FHStack spacing={0} ml={1.5}>
        {usersToShow.map((user, index) => (
          <Box ml={-1.5} key={index}>
            <UserView user={user} size={35} />
          </Box>
        ))}
      </FHStack>
      {moreThanLimit > 0 && (
        <Typography fontSize={13} color="grey.500">
          +{moreThanLimit}
        </Typography>
      )}
    </FHStack>
  );
};

export default AvatarGroup;
