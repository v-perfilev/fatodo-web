import * as React from 'react';
import {FC, PropsWithChildren} from 'react';
import {SvgIcon, SvgIconProps} from '@material-ui/core';

type Props = PropsWithChildren<SvgIconProps>;

export const LowPriorityIcon: FC<Props> = (props: Props) => (
  <SvgIcon {...props}>
    <path d="M2.5 14.5H6.5V20.5H2.5V14.5Z" fill="currentColor" />
    <path d="M9.5 9.5H13.5V20.5H9.5V9.5Z" stroke="currentColor" fill="none" />
    <path d="M16.5 3.5H20.5V20.5H16.5V3.5Z" stroke="currentColor" fill="none" />
  </SvgIcon>
);
