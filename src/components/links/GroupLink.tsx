import React from 'react';
import {GroupInfo} from '../../models/Group';
import Link from '../controls/Link';
import {GroupRouteUtils} from '../../routes/GroupRouter';

type GroupLinkProps = {
  group: GroupInfo;
  color?: string;
  noLink?: boolean;
};

export const GroupLink = ({group, color, noLink}: GroupLinkProps) => {
  const url = GroupRouteUtils.getViewUrl(group.id);

  return noLink ? (
    <>{group.title}</>
  ) : (
    <Link to={url} color={color}>
      {group.title}
    </Link>
  );
};

export default GroupLink;
