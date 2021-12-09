import * as React from 'react';
import {FC} from 'react';
import {Icon, IconProps} from '../surfaces';

type Props = IconProps;

export const StatusClosedIcon: FC<Props> = (props: Props) => (
  <Icon {...props}>
    <path fill="currentColor" d="M12,2A10,10 0 0,0 2,12A10,10 0 0,0 12,22A10,10 0 0,0 22,12A10,10 0 0,0 12,2Z" />
  </Icon>
);
