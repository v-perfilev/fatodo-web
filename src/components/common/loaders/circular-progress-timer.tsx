import * as React from 'react';
import {FC} from 'react';
import {Box, CircularProgress, CircularProgressProps, Typography} from '@material-ui/core';
import {circularProgressTimerStyles} from './_styles';

type Props = CircularProgressProps & {
  value: number;
  maxValue: number;
};

const CircularProgressTimer: FC<Props> = ({value, maxValue, ...props}: Props) => {
  const classes = circularProgressTimerStyles();
  const progressValue = Math.round((value / maxValue) * 100);
  return (
    <Box className={classes.root}>
      <CircularProgress variant="static" {...props} value={progressValue} />
      <Box className={classes.textBox}>
        <Typography variant="h6" component="div" color="primary">
          {value}
        </Typography>
      </Box>
    </Box>
  );
};

export default CircularProgressTimer;
