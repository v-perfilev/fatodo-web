import React, {memo} from 'react';
import FVStack from '../../../components/boxes/FVStack';
import UserViewGroups from './UserViewGroups';
import UserViewControl from './UserViewControl';
import UserViewRelations from './UserViewRelations';
import UserFullView from '../../../components/views/UserFullView';
import {flowRight} from 'lodash';
import withUserContainer, {WithUserProps} from '../../../shared/hocs/withContainers/withUserContainer';
import ConditionalSpinner from '../../../components/layouts/ConditionalSpinner';

type UserViewProps = WithUserProps;

const UserView = ({user, loading}: UserViewProps) => {
  return (
    <ConditionalSpinner loading={loading}>
      <FVStack>
        <UserFullView user={user} />
        <UserViewControl user={user} />
        <UserViewGroups />
        <UserViewRelations />
      </FVStack>
    </ConditionalSpinner>
  );
};

export default flowRight([memo, withUserContainer])(UserView);
