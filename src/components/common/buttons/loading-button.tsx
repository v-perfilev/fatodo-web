import * as React from 'react';
import {ButtonHTMLAttributes, FC} from 'react';
import {Button, ButtonTypeMap, CircularProgress, LinearProgress} from '@material-ui/core';
import {activeButtonStyles} from './_styles';

interface ComponentProps {
  loading?: boolean;
  progressValue?: number;
}

type Props = ComponentProps & ButtonTypeMap['props'] & ButtonHTMLAttributes<HTMLButtonElement>;

const LoadingButton: FC<Props> = ({children, loading, progressValue, ...props}: Props) => {
  const classes = activeButtonStyles();

  return (
    <Button
      variant="contained"
      color="primary"
      size="large"
      {...props}
      startIcon={!loading && props.startIcon}
      className={classes.root}
    >
      {!loading ? children : <CircularProgress size={26} color="inherit" />}
      {Number.isFinite(progressValue) && (
        <LinearProgress variant="determinate" value={progressValue} className={classes.linearLoader} />
      )}
    </Button>
  );
};

export default LoadingButton;
