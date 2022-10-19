import React, {HTMLAttributes} from 'react';
import {Box, Stack} from '@mui/material';
import {User} from '../../models/User';
import UrlPic from '../images/UrlPic';
import PaperBox from '../boxes/PaperBox';

type UserViewProps = HTMLAttributes<HTMLElement> & {
  user: User;
  size?: number;
  withUserPic?: boolean;
  withUsername?: boolean;
  withPaperBox?: boolean;
};

const UserView = (props: UserViewProps) => {
  const {user, size, withUserPic = true, withUsername = false, withPaperBox = false} = props;
  const {onMouseOver, onMouseLeave} = props;

  const imageWithUsername = (
    <Stack spacing={1} direction="row" alignItems="center">
      {withUserPic && <UrlPic alt={user.username} url={user.imageFilename} size={size} />}
      {withUsername && <Box>{user.username}</Box>}
    </Stack>
  );

  const userView = withPaperBox ? <PaperBox>{imageWithUsername}</PaperBox> : imageWithUsername;

  return (
    <Box onMouseOver={onMouseOver} onMouseLeave={onMouseLeave}>
      {userView}
    </Box>
  );
};

export default UserView;
