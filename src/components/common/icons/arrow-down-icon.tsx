import * as React from 'react';
import {FC} from 'react';
import {SvgIcon} from '@material-ui/core';
import {CommonProps} from '@material-ui/core/OverridableComponent';

export const ArrowDownIcon: FC<CommonProps<any>> = (props) => (
  <SvgIcon {...props}>
    <path fill="currentColor" d="M7.41,8.58L12,13.17L16.59,8.58L18,10L12,16L6,10L7.41,8.58Z" />
  </SvgIcon>
);
