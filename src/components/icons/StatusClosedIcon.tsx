import React from 'react';
import Icon, {IconProps} from '../surfaces/Icon';

const StatusClosedIcon = (props: IconProps) => (
  <Icon {...props}>
    <path fill="currentColor" d="M12,2A10,10 0 0,0 2,12A10,10 0 0,0 12,22A10,10 0 0,0 22,12A10,10 0 0,0 12,2Z" />
  </Icon>
);

export default StatusClosedIcon;
