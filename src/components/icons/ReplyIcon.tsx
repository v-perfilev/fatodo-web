import React from 'react';
import Icon, {IconProps} from '../surfaces/Icon';

const ReplyIcon = (props: IconProps) => (
  <Icon {...props}>
    <path fill="currentColor" d="M10,9V5L3,12L10,19V14.9C15,14.9 18.5,16.5 21,20C20,15 17,10 10,9Z" />
  </Icon>
);

export default ReplyIcon;
