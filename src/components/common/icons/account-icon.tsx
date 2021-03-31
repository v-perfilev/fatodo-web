import * as React from 'react';
import {FC, PropsWithChildren} from 'react';
import {SvgIcon, SvgIconProps} from '@material-ui/core';

type Props = PropsWithChildren<SvgIconProps>;

export const AccountIcon: FC<Props> = (props: Props) => (
  <SvgIcon {...props}>
    <path
      fill="currentColor"
      d="M12,4A4,4 0 0,1 16,8A4,4 0 0,1 12,12A4,4 0 0,1 8,8A4,4 0 0,1 12,4M12,14C16.42,14 20,15.79
      20,18V20H4V18C4,15.79 7.58,14 12,14Z"
    />
  </SvgIcon>
);
