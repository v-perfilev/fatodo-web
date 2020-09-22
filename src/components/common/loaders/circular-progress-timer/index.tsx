import * as React from 'react';
import {FC, HTMLAttributes} from 'react';
import {Box, CircularProgress, CircularProgressProps, Typography} from '@material-ui/core';
import {circularProgressTimerStyles} from './_styles';
import csx from 'classnames';

type Props = HTMLAttributes<any> &
  CircularProgressProps & {
  value: number;
  maxValue: number;
};

export const CircularProgressTimer: FC<Props> = ({value, maxValue, className, ...props}: Props) => {
  const classes = circularProgressTimerStyles();
  const classNames = csx(classes.root, className);

  const progressValue = Math.round((value / maxValue) * 100);

  return (
    <Box className={classNames}>
      <CircularProgress variant="static" {...props} value={progressValue} />
      <Box className={classes.textBox}>
        <Typography variant="h6" component="div" color="primary">
          {value}
        </Typography>
      </Box>
    </Box>
  );
};
