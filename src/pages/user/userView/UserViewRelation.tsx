import React, {useCallback} from 'react';
import UserView from '../../../components/views/UserView';
import {useAppSelector} from '../../../store/store';
import InfoSelectors from '../../../store/info/infoSelectors';
import {ContactRelation} from '../../../models/Contact';

type UserViewRelationProps = {
  relation: ContactRelation;
};

const UserViewRelation = ({relation}: UserViewRelationProps) => {
  const userSelector = useCallback(InfoSelectors.makeUserSelector(), []);
  const user = useAppSelector((state) => userSelector(state, relation.secondUserId));

  return <UserView user={user} withUsername />;
};

export default UserViewRelation;
