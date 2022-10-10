import React from 'react';
import {Box} from '@material-ui/core';
import {makeStyles} from '@material-ui/core/styles';

const Grower = () => {
  const classes = growerStyles();
  return <Box className={classes.root} />;
};

const growerStyles = makeStyles(() => ({
  root: {
    flexGrow: 1,
  },
}));

export default Grower;
