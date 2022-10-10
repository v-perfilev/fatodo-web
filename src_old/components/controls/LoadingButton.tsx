import React, {ButtonHTMLAttributes} from 'react';
import {Button, ButtonTypeMap, CircularProgress, LinearProgress} from '@material-ui/core';
import {makeStyles} from '@material-ui/core/styles';

type LoadingButtonProps = ButtonTypeMap['props'] &
  ButtonHTMLAttributes<HTMLButtonElement> & {
    loading?: boolean;
    progressValue?: number;
  };

const LoadingButton = ({children, loading, progressValue, ...props}: LoadingButtonProps) => {
  const classes = loadingButtonStyles();

  const variant = props.variant ?? 'contained';
  const color = props.color ?? 'primary';
  const size = props.size ?? 'large';
  const progressSize = size === 'large' ? 26 : size === 'medium' ? 20 : 14;

  return (
    <Button
      variant={variant}
      color={color}
      size={size}
      {...props}
      startIcon={!loading && props.startIcon}
      className={classes.root}
    >
      {!loading ? children : <CircularProgress size={progressSize} color="inherit" />}
      {Number.isFinite(progressValue) && (
        <LinearProgress variant="determinate" value={progressValue} className={classes.linearLoader} />
      )}
    </Button>
  );
};

const loadingButtonStyles = makeStyles(() => ({
  root: {
    overflow: 'hidden',
  },
  linearLoader: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
  },
}));

export default LoadingButton;
