import React from 'react';
import FVStack from '../../../components/boxes/FVStack';
import UserViewGroups from './UserViewGroups';
import UserViewControl from './UserViewControl';
import UserViewRelations from './UserViewRelations';
import {User} from '../../../models/User';
import UserFullView from '../../../components/views/UserFullView';

type UserViewProps = {
  user: User;
};

const UserView = ({user}: UserViewProps) => {
  return (
    <FVStack>
      <UserFullView user={user} />
      <UserViewControl user={user} />
      <UserViewGroups />
      <UserViewRelations />
    </FVStack>
  );
};

export default UserView;
