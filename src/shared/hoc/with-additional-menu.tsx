import * as React from 'react';
import {ComponentType, FC, ReactElement} from 'react';
import {Box, Hidden} from '@material-ui/core';
import {additionalMenuStyles} from './_styles';
import AdditionalMenu from '../../components/layout/additional-menu/additional-menu';

const withAdditionalMenu = (Component: ComponentType): FC => (props): ReactElement => {
  const classes = additionalMenuStyles();

  return (
    <Box className={classes.root}>
      <Hidden xsDown>
        <AdditionalMenu />
      </Hidden>
      <Box className={classes.container}>
        <Component {...props} />
      </Box>
      <Hidden smUp>
        <AdditionalMenu bottom />
      </Hidden>
    </Box>
  );
};

export default withAdditionalMenu;
