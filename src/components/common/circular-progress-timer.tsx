import * as React from 'react';
import {FC} from 'react';
import {Box, CircularProgress, CircularProgressProps, Typography} from '@material-ui/core';

interface ComponentProps {
  value: number;
  maxValue: number;
}

type Props = ComponentProps & CircularProgressProps;

const CircularProgressTimer: FC<Props> = ({value, maxValue, ...props}: Props) => {
  const progressValue = Math.round((value / maxValue) * 100);
  return (
    <Box position="relative" display="inline-flex">
      <CircularProgress variant="static" {...props} value={progressValue} />
      <Box
        top={0}
        left={0}
        bottom={0}
        right={0}
        position="absolute"
        display="flex"
        alignItems="center"
        justifyContent="center"
      >
        <Typography variant="h6" component="div" color="primary">
          {value}
        </Typography>
      </Box>
    </Box>
  );
};

export default CircularProgressTimer;
