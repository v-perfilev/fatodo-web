import React from 'react';
import {Box} from '@mui/material';
import {User} from '../../models/User';
import UrlPic from '../images/UrlPic';
import HoverPopup from '../layouts/hoverPopup/HoverPopup';
import UserPopupView from '../../pages/user/userView/UserView';
import FHStack from '../boxes/FHStack';
import {useAppSelector} from '../../store/store';
import AuthSelectors from '../../store/auth/authSelectors';

type UserViewProps = {
  user: User;
  size?: number;
  withUserPic?: boolean;
  withUsername?: boolean;
};

const UserView = ({user, size, withUserPic = true, withUsername = false}: UserViewProps) => {
  const account = useAppSelector(AuthSelectors.account);

  const isAnotherUser = user && user.id !== account.id;

  const userView = (
    <FHStack spacing={1}>
      {withUserPic && <UrlPic alt={user?.username} url={user?.imageFilename} size={size} />}
      {withUsername && <Box>{user?.username}</Box>}
    </FHStack>
  );

  const userPopupView = <UserPopupView user={user} />;

  return isAnotherUser ? <HoverPopup anchorElement={userView} popupElement={userPopupView} /> : userView;
};

export default UserView;
