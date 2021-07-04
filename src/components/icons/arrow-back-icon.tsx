import * as React from 'react';
import {FC} from 'react';
import {Icon, IconProps} from '../surfaces';

type Props = IconProps;

export const ArrowBackIcon: FC<Props> = (props: Props) => (
  <Icon {...props}>
    <path fill="currentColor" d="M20,9V15H12V19.84L4.16,12L12,4.16V9H20Z" />
  </Icon>
);
