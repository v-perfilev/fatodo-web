import * as React from 'react';
import {FC} from 'react';
import {IconWithMargin, IconWithMarginProps} from '../surfaces/icon-with-margin';

type Props = IconWithMarginProps;

export const PackageDownIcon: FC<Props> = (props: Props) => (
  <IconWithMargin {...props}>
    <path
      fill="currentColor"
      d="M5.12,5L5.93,4H17.93L18.87,5M12,17.5L6.5,12H10V10H14V12H17.5L12,17.5M20.54,5.23L19.15,
    3.55C18.88,3.21 18.47,3 18,3H6C5.53,3 5.12,3.21 4.84,3.55L3.46,5.23C3.17,5.57 3,6 3,6.5V19A2,2 0 0,0
    5,21H19A2,2 0 0,0 21,19V6.5C21,6 20.83,5.57 20.54,5.23Z"
    />
  </IconWithMargin>
);
