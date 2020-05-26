import * as React from 'react';
import {ComponentType, FC, ReactElement} from 'react';
import {Box} from '@material-ui/core';
import {contentWrapperStyles} from './_styles';

const useStyles = contentWrapperStyles;

const withContentWrapper = (Component: ComponentType): FC => (): ReactElement => {
  const classes = useStyles();

  return (
    <Box className={classes.root}>
      <Component />
    </Box>
  );
};

export default withContentWrapper;
