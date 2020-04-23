import * as React from 'react';
import { TransitionProps } from '@material-ui/core/transitions';
import { Slide } from '@material-ui/core';

export const slideDown = React.forwardRef((
  props: TransitionProps&{children?: React.ReactElement<any, any>},
  ref: React.Ref<unknown>,
) => <Slide direction="down" ref={ref} {...props} />);
