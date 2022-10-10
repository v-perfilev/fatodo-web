import React, {PropsWithChildren} from 'react';
import MessageIcon from '../MessageIcon';
import {Badge, SvgIconProps} from '@mui/material';

type BadgeMessageIconProps = PropsWithChildren<SvgIconProps> & {
  count: number;
};

const BadgeMessageIcon = ({count, ...props}: BadgeMessageIconProps) => {
  return (
    <Badge badgeContent={count} color="error">
      <MessageIcon {...props} />
    </Badge>
  );
};

export default BadgeMessageIcon;
