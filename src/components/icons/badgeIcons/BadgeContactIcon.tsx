import React, {PropsWithChildren} from 'react';
import UserListIcon from '../UserListIcon';
import {Badge, SvgIconProps} from '@mui/material';

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
