import * as React from 'react';
import {FC, PropsWithChildren} from 'react';
import {SvgIcon, SvgIconProps} from '@material-ui/core';

type Props = PropsWithChildren<SvgIconProps>;

export const ArrowLeftIcon: FC<Props> = (props: Props) => (
  <SvgIcon {...props}>
    <path fill="currentColor" d="M15.41,16.58L10.83,12L15.41,7.41L14,6L8,12L14,18L15.41,16.58Z" />
  </SvgIcon>
);
