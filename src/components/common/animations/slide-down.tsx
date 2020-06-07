import * as React from 'react';
import {TransitionProps} from '@material-ui/core/transitions';
import {Slide} from '@material-ui/core';

export const SlideDown = React.forwardRef(function forwardedSlide(
  props: TransitionProps & {children?: React.ReactElement<any, any>},
  ref: React.Ref<unknown>
) {
  return <Slide direction="down" ref={ref} {...props} />;
});
