import * as React from 'react';
import {ButtonHTMLAttributes, FC} from 'react';
import {Button, ButtonTypeMap, CircularProgress, LinearProgress} from '@material-ui/core';
import {loadingButtonStyles} from './_styles';

type Props = ButtonTypeMap['props'] &
  ButtonHTMLAttributes<HTMLButtonElement> & {
    loading?: boolean;
    progressValue?: number;
  };

export const LoadingButton: FC<Props> = ({children, loading, progressValue, ...props}: Props) => {
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
