import React from 'react';
import Icon, {IconProps} from '../surfaces/Icon';

const SendMessageIcon = (props: IconProps) => (
  <Icon {...props}>
    <path fill="currentColor" d="M2,21L23,12L2,3V10L17,12L2,14V21Z" />
  </Icon>
);

export default SendMessageIcon;
