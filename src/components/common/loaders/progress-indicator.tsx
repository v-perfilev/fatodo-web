import * as React from 'react';
import {FC, ReactElement} from 'react';
import {Box, CircularProgress} from '@material-ui/core';
import {progressIndicatorStyles} from './_styles';
import csx from 'classnames';

type Props = {
  component?: ReactElement;
  transparent?: boolean;
  hide?: boolean;
  center?: boolean;
};

const ProgressIndicator: FC<Props> = ({transparent, hide, center, component}: Props) => {
  const classes = progressIndicatorStyles();
  const classNames = csx(
    {[classes.center]: !!center},
    {[classes.transparent]: !!transparent},
    {[classes.hide]: !!hide}
  );

  const progressComponent = !!component ? component : <CircularProgress color={'secondary'} />;

  return <Box className={classNames}>{progressComponent}</Box>;
};

export default ProgressIndicator;
