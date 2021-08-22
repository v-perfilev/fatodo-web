import * as React from 'react';
import {FC} from 'react';
import {Icon, IconProps} from '../surfaces';

type Props = IconProps;

export const NoteIcon: FC<Props> = (props: Props) => (
  <Icon {...props}>
    <path
      fill="currentColor"
      d="M14,10V4.5L19.5,10M5,3C3.89,3 3,3.89 3,5V19A2,2 0 0,0
    5,21H19A2,2 0 0,0 21,19V9L15,3H5Z"
    />
  </Icon>
);