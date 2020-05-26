import * as React from 'react';
import {ComponentType, FC, ReactElement} from 'react';
import {Grid} from '@material-ui/core';
import {centralContainerStyles} from './_styles';

const useStyles = centralContainerStyles;

const withCentralContainer = (Component: ComponentType): FC => (): ReactElement => {
  const classes = useStyles();

  return (
    <Grid container className={classes.root}>
      <Grid item xs={8} sm={6} lg={4}>
        <Component />
      </Grid>
    </Grid>
  );
};

export default withCentralContainer;
