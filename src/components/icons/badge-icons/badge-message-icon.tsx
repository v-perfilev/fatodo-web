import * as React from 'react';
import {FC, PropsWithChildren} from 'react';
import {Badge, SvgIconProps} from '@material-ui/core';
import {MessageIcon} from '../message-icon';

type Props = PropsWithChildren<SvgIconProps> & {
  count: number;
  color?: 'primary' | 'secondary' | 'default' | 'error';
};

const BadgeMessageIcon: FC<Props> = ({count, color, ...props}: Props) => {
  const badgeColor = color || 'error';
  return (
    <Badge badgeContent={count} color={badgeColor}>
      <MessageIcon {...props} />
    </Badge>
  );
};

export default BadgeMessageIcon;
