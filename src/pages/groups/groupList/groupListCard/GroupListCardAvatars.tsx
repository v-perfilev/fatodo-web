import React, {useCallback} from 'react';
import {Group} from '../../../../models/Group';
import {useAppSelector} from '../../../../store/store';
import InfoSelectors from '../../../../store/info/infoSelectors';
import AvatarGroup from '../../../../components/surfaces/AvatarGroup';

type GroupListCardAvatarsProps = {
  group: Group;
};

const GroupListCardAvatars = ({group}: GroupListCardAvatarsProps) => {
  const usersSelector = useCallback(InfoSelectors.makeUsersSelector(), []);
  const userIds = group.members.map((user) => user.userId);
  const users = useAppSelector((state) => usersSelector(state, userIds));

  return <AvatarGroup users={users} />;
};

export default GroupListCardAvatars;
