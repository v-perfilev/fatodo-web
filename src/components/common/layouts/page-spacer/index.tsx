import React, {FC} from 'react';
import {Box} from '@material-ui/core';
import {pageSpacerStyles} from './_styles';

export const PageSpacer: FC = () => {
  const classes = pageSpacerStyles();
  return <Box className={classes.root} />;
};
