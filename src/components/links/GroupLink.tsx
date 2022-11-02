import React from 'react';
import {GroupInfo} from '../../models/Group';
import Link from '../controls/Link';
import {GroupRouteUtils} from '../../routes/GroupRouter';

type GroupLinkProps = {
  group: GroupInfo;
  color?: string;
};

export const GroupLink = ({group, color}: GroupLinkProps) => {
  const url = GroupRouteUtils.getViewUrl(group.id);

  return (
    <Link to={url} color={color}>
      {group.title}
    </Link>
  );
};

export default GroupLink;
