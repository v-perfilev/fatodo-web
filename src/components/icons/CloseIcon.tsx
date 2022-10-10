import React from 'react';
import Icon, {IconProps} from '../surfaces/Icon';

const CloseIcon = (props: IconProps) => (
  <Icon {...props}>
    <path
      fill="currentColor"
      d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"
    />
    <path fill="none" d="M0 0h24v24H0z" />
  </Icon>
);

export default CloseIcon;
