import React from 'react';
import {User} from '../../models/User';
import {useTranslation} from 'react-i18next';

type UserLinkProps = {
  user: User;
};

export const UserLink = ({user}: UserLinkProps) => {
  const {t} = useTranslation();

  let text = user?.username;
  if (user?.deleted) {
    text = t('common:links.userDeleted');
  }

  return <>{text}</>;
};

export default UserLink;
