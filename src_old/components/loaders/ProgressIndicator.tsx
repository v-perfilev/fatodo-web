import React, {ReactElement} from 'react';
import {Box, CircularProgress} from '@material-ui/core';
import csx from 'classnames';
import {makeStyles} from '@material-ui/core/styles';

type ProgressIndicatorProps = {
  component?: ReactElement;
  transparent?: boolean;
  hide?: boolean;
  center?: boolean;
};

const ProgressIndicator = ({transparent, hide, center, component}: ProgressIndicatorProps) => {
  const classes = progressIndicatorStyles();
  const classNames = csx(
    {[classes.center]: !!center},
    {[classes.transparent]: !!transparent},
    {[classes.hide]: !!hide},
  );

  const progressComponent = !!component ? component : <CircularProgress color={'secondary'} />;

  return <Box className={classNames}>{progressComponent}</Box>;
};

const progressIndicatorStyles = makeStyles(() => ({
  transparent: {
    opacity: 0,
  },
  hide: {
    display: 'none !important',
  },
  center: {
    display: 'flex',
    justifyContent: 'center',
  },
}));

export default ProgressIndicator;
