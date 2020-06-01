import * as React from 'react';
import {FC} from 'react';
import {spinnerStyles} from './_styles';
import {Box} from '@material-ui/core';

const Spinner: FC = () => {
  const classes = spinnerStyles();

  return (
    <Box className={classes.root}>
      <img src="/spinner.svg" className={classes.image} alt="Fatodo" />
    </Box>
  );
};

export default Spinner;
