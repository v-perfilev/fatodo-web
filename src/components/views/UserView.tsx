import React from 'react';
import {Typography} from '@mui/material';
import {User} from '../../models/User';
import UrlPic from '../images/UrlPic';
import HoverPopup from '../layouts/hoverPopup/HoverPopup';
import UserPopupView from '../../pages/user/userView/UserView';
import FHStack from '../boxes/FHStack';
import {useAppSelector} from '../../store/store';
import AuthSelectors from '../../store/auth/authSelectors';
import {useTranslation} from 'react-i18next';
import {UserUtils} from '../../shared/utils/UserUtils';

type UserViewProps = {
  user: User;
  size?: number;
  withUserPic?: boolean;
  withUsername?: boolean;
};

const UserView = ({user, size, withUserPic = true, withUsername = false}: UserViewProps) => {
  const account = useAppSelector(AuthSelectors.account);
  const {t} = useTranslation();

  const isAnotherUser = user && user.id !== account.id;
  const isNotDeleted = user && !user.deleted;

  const userView = (
    <FHStack spacing={1}>
      {withUserPic && <UrlPic alt={user?.username} url={user?.imageFilename} size={size} />}
      {withUsername && <Typography fontSize={14}>{UserUtils.getUsername(user, t)}</Typography>}
    </FHStack>
  );

  const userPopupView = <UserPopupView user={user} />;

  return isAnotherUser && isNotDeleted ? (
    <HoverPopup anchorElement={userView} popupElement={userPopupView} />
  ) : (
    userView
  );
};

export default UserView;
