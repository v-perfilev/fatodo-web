import React, {PropsWithChildren} from 'react';
import {SvgIcon, SvgIconProps} from '@mui/material';

export type IconProps = PropsWithChildren<SvgIconProps>;

const Icon = ({children, ...props}: IconProps) => {
  return <SvgIcon {...props}>{children}</SvgIcon>;
};

export default Icon;
