import * as React from 'react';
import {FC} from 'react';
import {IconWithMargin, IconWithMarginProps} from '../surfaces/icon-with-margin';

type Props = IconWithMarginProps;

export const ArrowRightIcon: FC<Props> = (props: Props) => (
  <IconWithMargin {...props}>
    <path fill="currentColor" d="M8.59,16.58L13.17,12L8.59,7.41L10,6L16,12L10,18L8.59,16.58Z" />
  </IconWithMargin>
);
