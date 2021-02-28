import * as React from 'react';
import {FC} from 'react';
import {Box, Drawer, Theme, useMediaQuery} from '@material-ui/core';
import {additionalMenuStyles} from './_styles';
import csx from 'classnames';
import {Logo} from '../logo';
import {useAdditionalMenuContext} from '../../../../shared/contexts/additional-menu-context';
import AdditionalMenuSpacer from './additional-menu-spacer';

const AdditionalMenu: FC = () => {
  const classes = additionalMenuStyles();
  const {menu} = useAdditionalMenuContext();
  const isBigDevice = useMediaQuery((theme: Theme) => theme.breakpoints.up('sm'));

  const drawerClassNames = csx(classes.drawer, isBigDevice ? classes.drawerLeft : classes.drawerBottom);
  const containerClassNames = csx(classes.container, isBigDevice ? classes.containerLeft : classes.containerBottom);

  return (
    <Drawer
      variant="permanent"
      anchor={isBigDevice ? 'left' : 'bottom'}
      className={drawerClassNames}
      classes={{paper: drawerClassNames}}
    >
      {isBigDevice && (
        <Box className={classes.logo}>
          <Logo />
        </Box>
      )}
      <Box className={containerClassNames}>
        <AdditionalMenuSpacer showOnBigDevices />
        {menu}
      </Box>
    </Drawer>
  );
};

export default AdditionalMenu;
