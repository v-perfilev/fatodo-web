import React from 'react';
import {Box, Theme} from '@material-ui/core';
import {makeStyles} from '@material-ui/core/styles';

const PageSpacer = () => {
  const classes = pageSpacerStyles();

  return <Box className={classes.root} />;
};

const pageSpacerStyles = makeStyles((theme: Theme) => ({
  root: {
    height: theme.spacing(2),
  },
}));

export default PageSpacer;
