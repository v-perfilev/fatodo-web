import * as React from 'react';
import {FC, PropsWithChildren} from 'react';
import {Badge, SvgIconProps} from '@material-ui/core';
import {MessageIcon} from '../message-icon';

type Props = PropsWithChildren<SvgIconProps> & {
  count: number;
}

const BadgeMessageIcon: FC<Props> = ({count, ...props}: Props) => {

  return count ? (
    <Badge badgeContent={count} color="error">
      <MessageIcon {...props} />
    </Badge>
  ) : (
    <MessageIcon {...props} />
  );

};

export default BadgeMessageIcon;
