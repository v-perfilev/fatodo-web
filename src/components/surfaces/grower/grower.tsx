import React, {FC} from 'react';
import {Box} from '@material-ui/core';
import {growerStyles} from './_styles';

export const Grower: FC = () => {
  const classes = growerStyles();
  return <Box className={classes.root} />;
};
