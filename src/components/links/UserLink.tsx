import React from 'react';
import {User} from '../../models/User';
import {useTranslation} from 'react-i18next';
import {UserUtils} from '../../shared/utils/UserUtils';

type UserLinkProps = {
  user: User;
};

export const UserLink = ({user}: UserLinkProps) => {
  const {t} = useTranslation();

  return <>{UserUtils.getUsername(user, t)}</>;
};

export default UserLink;
