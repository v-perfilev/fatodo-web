import React from 'react';
import {User} from '../../models/User';

type UserLinkProps = {
  user: User;
};

export const UserLink = ({user}: UserLinkProps) => {
  return <>{user?.username}</>;
};

export default UserLink;
