import React from 'react';
import {Icon, IconProps} from '../surfaces';

const NormalPriorityIcon = (props: IconProps) => (
  <Icon {...props}>
    <path d="M2.5 14.5H6.5V20.5H2.5V14.5Z" fill="currentColor" />
    <path d="M9.5 9.5H13.5V20.5H9.5V9.5Z" fill="currentColor" />
    <path d="M16.5 3.5H20.5V20.5H16.5V3.5Z" stroke="currentColor" fill="none" />
  </Icon>
);

export default NormalPriorityIcon;
