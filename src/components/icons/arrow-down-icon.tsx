import * as React from 'react';
import {FC} from 'react';
import {Icon, IconProps} from '../surfaces';

type Props = IconProps;

export const ArrowDownIcon: FC<Props> = (props: Props) => (
  <Icon {...props}>
    <path fill="currentColor" d="M7.41,8.58L12,13.17L16.59,8.58L18,10L12,16L6,10L7.41,8.58Z" />
  </Icon>
);
