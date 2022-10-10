import * as React from 'react';
import {PropsWithChildren} from 'react';
import {Badge, SvgIconProps} from '@material-ui/core';
import MessageIcon from '../MessageIcon';

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
