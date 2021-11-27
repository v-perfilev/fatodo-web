import * as React from 'react';
import {FC, PropsWithChildren} from 'react';
import {Badge, SvgIconProps} from '@material-ui/core';
import {UserListIcon} from '../user-list-icon';

type Props = PropsWithChildren<SvgIconProps> & {
  count: number;
};

const BadgeContactInfo: FC<Props> = ({count, ...props}: Props) => {
  return (
    <Badge badgeContent={count} color="error">
      <UserListIcon {...props} />
    </Badge>
  );
};

export default BadgeContactInfo;
