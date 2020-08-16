import React, {FC} from 'react';
import {Box} from '@material-ui/core';
import {pageSpacerStyles} from './_styles';

const PageSpacer: FC = () => {
  const classes = pageSpacerStyles();
  return (
    <Box className={classes.root} />
  );
};

export default PageSpacer;
