import React from 'react';
import {Button, ButtonProps, CircularProgress, LinearProgress, SxProps} from '@mui/material';

type LoadingButtonProps = ButtonProps & {
  loading?: boolean;
  progressValue?: number;
};

const LoadingButton = ({children, loading, progressValue, ...props}: LoadingButtonProps) => {
  const variant = props.variant || 'outlined';
  const color = props.color || 'primary';
  const size = props.size || 'large';
  const progressSize = size === 'large' ? 26 : size === 'medium' ? 20 : 14;

  return (
    <Button
      sx={buttonStyles}
      variant={variant}
      color={color}
      size={size}
      startIcon={!loading && props.startIcon}
      {...props}
    >
      {!loading ? children : <CircularProgress size={progressSize} color="inherit" />}
      {Number.isFinite(progressValue) && (
        <LinearProgress sx={loaderStyles} variant="determinate" value={progressValue} />
      )}
    </Button>
  );
};

const buttonStyles: SxProps = {
  overflow: 'hidden',
};

const loaderStyles: SxProps = {
  position: 'absolute',
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
};

export default LoadingButton;
