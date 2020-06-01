import * as React from 'react';
import {ComponentType, FC, ReactElement} from 'react';
import {Grid} from '@material-ui/core';
import {centeringStyles} from './_styles';

const withCentering = (Component: ComponentType): FC => (props): ReactElement => {
  const classes = centeringStyles();

  return (
    <Grid container className={classes.root}>
      <Grid item xs={8} sm={6} lg={4}>
        <Component {...props} />
      </Grid>
    </Grid>
  );
};

export default withCentering;
