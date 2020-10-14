import * as React from 'react';
import { FC } from 'react';
import { SvgIcon } from '@material-ui/core';
import { CommonProps } from '@material-ui/core/OverridableComponent';

export const ArrowBackIcon: FC<CommonProps<any>> = (props) => (
  <SvgIcon {...props}>
    <path
      fill="currentColor"
      d="M20,9V15H12V19.84L4.16,12L12,4.16V9H20Z"
    />
  </SvgIcon>
);
