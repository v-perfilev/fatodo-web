import React from 'react';
import Icon, {IconProps} from '../surfaces/Icon';

const PlusIcon = (props: IconProps) => (
  <Icon {...props}>
    <path fill="currentColor" d="M19,13H13V19H11V13H5V11H11V5H13V11H19V13Z" />
  </Icon>
);

export default PlusIcon;
