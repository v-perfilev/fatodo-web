import * as React from 'react';
import {FC} from 'react';
import {IconWithMargin, IconWithMarginProps} from '../surfaces/icon-with-margin';

type Props = IconWithMarginProps;

export const ArrowBackIcon: FC<Props> = (props: Props) => (
  <IconWithMargin {...props}>
    <path fill="currentColor" d="M20,9V15H12V19.84L4.16,12L12,4.16V9H20Z" />
  </IconWithMargin>
);
