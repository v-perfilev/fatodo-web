import React from 'react';
import {GroupInfo} from '../../models/Group';
import Link from '../controls/Link';
import {GroupRouteUtils} from '../../routes/GroupRouter';

type GroupLinkProps = {
  group: GroupInfo;
};

export const GroupLink = ({group}: GroupLinkProps) => {
  const url = GroupRouteUtils.getViewUrl(group.id);

  return <Link to={url}>{group.title}</Link>;
};

export default GroupLink;
