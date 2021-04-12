import * as React from 'react';
import {FC} from 'react';
import {IconWithMargin, IconWithMarginProps} from '../surfaces/icon-with-margin';

type Props = IconWithMarginProps;

export const ItemsIcon: FC<Props> = (props: Props) => (
  <IconWithMargin {...props}>
    <path
      fill="currentColor"
      d="M3,5H9V11H3V5M5,7V9H7V7H5M11,7H21V9H11V7M11,15H21V17H11V15M5,20L1.5,16.5L2.91,15.09L5,17.17L9.59,
          12.59L11,14L5,20Z"
    />
  </IconWithMargin>
);
