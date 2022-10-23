import React from 'react';
import {Icon, IconProps} from '../surfaces';

const WeekIcon = (props: IconProps) => (
  <Icon {...props}>
    <path
      fill="currentColor"
      d="M6 1H8V3H16V1H18V3H19C20.11 3 21 3.9 21 5V19C21 20.11 20.11 21 19 21H5C3.89
    21 3 20.1 3 19V5C3 3.89 3.89 3 5 3H6V1M5 8V19H19V8H5M7 10H17V12H7V10Z"
    />
  </Icon>
);

export default WeekIcon;