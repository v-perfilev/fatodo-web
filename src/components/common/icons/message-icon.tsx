import * as React from 'react';
import {FC} from 'react';
import {Icon, IconProps} from '../surfaces';

type Props = IconProps;

export const MessageIcon: FC<Props> = (props: Props) => (
  <Icon {...props}>
    <path
      fill="currentColor"
      d="M20,2A2,2 0 0,1 22,4V16A2,2 0 0,1 20,18H6L2,22V4C2,2.89 2.9,2
      4,2H20M4,4V17.17L5.17,16H20V4H4M6,7H18V9H6V7M6,11H15V13H6V11Z"
    />
  </Icon>
);
