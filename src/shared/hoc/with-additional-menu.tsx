import * as React from 'react';
import {ComponentType, FC, ReactElement} from 'react';
import {Box, Theme, useMediaQuery} from '@material-ui/core';
import {additionalMenuStyles} from './_styles';
import AdditionalMenu from '../../components/common/layouts/additional-menu';
import csx from 'classnames';

const withAdditionalMenu = (Component: ComponentType): FC => (props): ReactElement => {
  const classes = additionalMenuStyles();
  const isBigDevice = useMediaQuery((theme: Theme) => theme.breakpoints.up('sm'));

  const rootClassNames = csx(classes.root, isBigDevice ? classes.rootMenuLeft : classes.rootMenuBottom);

  return (
    <Box className={rootClassNames}>
      <Box className={classes.container}>
        <Component {...props} />
      </Box>
      <AdditionalMenu />
    </Box>
  );
};

export default withAdditionalMenu;
