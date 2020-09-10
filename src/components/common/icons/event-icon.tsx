import * as React from 'react';
import {FC} from 'react';
import {SvgIcon} from '@material-ui/core';
import {CommonProps} from '@material-ui/core/OverridableComponent';

export const EventIcon: FC<CommonProps<any>> = (props) => (
  <SvgIcon {...props}>
    <path
      fill="currentColor"
      d="M19,19H5V8H19M16,1V3H8V1H6V3H5C3.89,3 3,3.89
    3,5V19A2,2 0 0,0 5,21H19A2,2 0 0,0 21,19V5C21,3.89 20.1,3 19,3H18V1"
    />
  </SvgIcon>
);
