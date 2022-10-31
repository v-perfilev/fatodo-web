import React from 'react';
import {User} from '../../../models/User';
import FHStack from '../../boxes/FHStack';
import UserView from '../../views/UserView';
import CheckboxInput from '../../controls/CheckboxInput';

type UsersSelectInputProps = {
  user: User;
  isSelected: boolean;
  toggleSelected: () => void;
};

const UsersSelectItem = ({user, isSelected, toggleSelected}: UsersSelectInputProps) => {
  return (
    <FHStack>
      <FHStack>
        <UserView user={user} withUserPic withUsername />
      </FHStack>
      <FHStack flexGrow={0}>
        <CheckboxInput onClick={toggleSelected} isSelected={isSelected} />
      </FHStack>
    </FHStack>
  );
};

export default UsersSelectItem;
