import * as React from 'react';
import {FC} from 'react';
import {SvgIcon} from '@material-ui/core';
import {CommonProps} from '@material-ui/core/OverridableComponent';

export const HomeIcon: FC<CommonProps<any>> = (props) => (
  <SvgIcon {...props}>
    <path fill="currentColor" d="M10,20V14H14V20H19V12H22L12,3L2,12H5V20H10Z" />
  </SvgIcon>
);
