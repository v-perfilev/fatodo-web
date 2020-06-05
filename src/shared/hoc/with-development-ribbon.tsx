import * as React from 'react';
import {ComponentType, FC, ReactElement} from 'react';
import {Box} from '@material-ui/core';
import {developmentRibbonStyles} from './_styles';

const withDevelopmentRibbon = (Component: ComponentType): FC => (): ReactElement => {
  const classes = developmentRibbonStyles();

  return (
    <>
      <Box className={classes.root}>
        DEVELOPMENT
        <Box className={classes.background} />
      </Box>
      <Component />
    </>
  );
};

export default withDevelopmentRibbon;
