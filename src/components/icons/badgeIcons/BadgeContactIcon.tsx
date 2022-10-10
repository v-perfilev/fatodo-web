import React, {PropsWithChildren} from 'react';
import {Badge, SvgIconProps} from '@material-ui/core';
import UserListIcon from '../UserListIcon';

type BadgeContactIconProps = PropsWithChildren<SvgIconProps> & {
  count: number;
};

const BadgeContactInfo = ({count, ...props}: BadgeContactIconProps) => {
  return (
    <Badge badgeContent={count} color="error">
      <UserListIcon {...props} />
    </Badge>
  );
};

export default BadgeContactInfo;
