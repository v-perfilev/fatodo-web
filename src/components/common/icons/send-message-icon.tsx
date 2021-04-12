import * as React from 'react';
import {FC} from 'react';
import {IconWithMargin, IconWithMarginProps} from '../surfaces/icon-with-margin';

type Props = IconWithMarginProps;

export const SendMessageIcon: FC<Props> = (props: Props) => (
  <IconWithMargin {...props}>
    <path fill="currentColor" d="M2,21L23,12L2,3V10L17,12L2,14V21Z" />
  </IconWithMargin>
);
