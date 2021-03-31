import * as React from 'react';
import {FC, PropsWithChildren} from 'react';
import {SvgIcon, SvgIconProps} from '@material-ui/core';

type Props = PropsWithChildren<SvgIconProps>;

export const NoteIcon: FC<Props> = (props: Props) => (
  <SvgIcon {...props}>
    <path
      fill="currentColor"
      d="M14,10V4.5L19.5,10M5,3C3.89,3 3,3.89 3,5V19A2,2 0 0,0
    5,21H19A2,2 0 0,0 21,19V9L15,3H5Z"
    />
  </SvgIcon>
);
