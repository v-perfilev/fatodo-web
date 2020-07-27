import * as React from 'react';
import {FC} from 'react';
import {SvgIcon} from '@material-ui/core';
import {CommonProps} from '@material-ui/core/OverridableComponent';

export const ReorderIcon: FC<CommonProps<any>> = (props) => (
  <SvgIcon {...props}>
    <rect x="9.80612" width="14.6939" height="6" rx="2" fill="currentColor" />
    <rect x="9.80612" y="9" width="14.6939" height="6" rx="2" fill="currentColor" />
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M22.8673 19H11.4388C11.2377 19 10.7857 19.2693
      10.7857 20V22C10.7857 22.7307 11.2377 23 11.4388 23H22.8673C23.0684 23 23.5204 22.7307 23.5204
      22V20C23.5204 19.2693 23.0684 19 22.8673 19ZM11.4388 18C10.5371 18 9.80612 18.8954 9.80612 20V22C9.80612
      23.1046 10.5371 24 11.4388 24H22.8673C23.769 24 24.5 23.1046 24.5 22V20C24.5 18.8954 23.769 18 22.8673
      18H11.4388Z"
      fill="currentColor"
    />
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M3.85837 6.53981C2.39518 8.00247 1.47959 10.077
      1.47959 12.3821C1.47959 15.3014 2.94811 17.8506 5.1365 19.2553L4.61506 20.1018C2.14431 18.5159 0.5
      15.6485 0.5 12.3821C0.5 9.80273 1.52546 7.47227 3.173 5.82533L3.85837 6.53981Z"
      fill="currentColor"
    />
    <path d="M5.81348 3.19365L4.97581 7.91669L1.52754 4.78786L5.81348 3.19365Z" fill="currentColor" />
  </SvgIcon>
);
