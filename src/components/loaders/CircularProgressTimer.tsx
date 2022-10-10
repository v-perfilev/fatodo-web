import React, {HTMLAttributes} from 'react';
import {Box, CircularProgress, CircularProgressProps, Typography} from '@material-ui/core';
import csx from 'classnames';
import {makeStyles} from '@material-ui/core/styles';

type CircularProgressTimerProps = HTMLAttributes<HTMLElement> &
  CircularProgressProps & {
    value: number;
    maxValue: number;
  };

const CircularProgressTimer = ({value, maxValue, className, ...props}: CircularProgressTimerProps) => {
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

const circularProgressTimerStyles = makeStyles(() => ({
  root: {
    position: 'relative',
    display: 'inline-flex',
  },
  textBox: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
}));

export default CircularProgressTimer;
