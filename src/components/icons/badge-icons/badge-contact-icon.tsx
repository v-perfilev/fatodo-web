import * as React from 'react';
import {FC, PropsWithChildren} from 'react';
import {Badge, SvgIconProps} from '@material-ui/core';
import {UserListIcon} from '../user-list-icon';

type Props = PropsWithChildren<SvgIconProps> & {
  count: number;
  color?: 'primary' | 'secondary' | 'default' | 'error';
};

const BadgeContactInfo: FC<Props> = ({count, color, ...props}: Props) => {
  const badgeColor = color || 'error';
  return (
    <Badge badgeContent={count} color={badgeColor}>
      <UserListIcon {...props} />
    </Badge>
  );
};

export default BadgeContactInfo;
