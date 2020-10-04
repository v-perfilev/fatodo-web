import * as React from 'react';
import {FC, useEffect, useState} from 'react';
import {Box, Drawer, Fade, Theme, useMediaQuery} from '@material-ui/core';
import {additionalMenuStyles} from './_styles';
import csx from 'classnames';
import {ADDITIONAL_MENU_UPDATE} from '../../../../constants';
import {Logo} from '../logo';
import {useAdditionalMenuContext} from '../../../../shared/contexts/additional-menu-context';

const AdditionalMenu: FC = () => {
  const classes = additionalMenuStyles();
  const {menu, reload} = useAdditionalMenuContext();
  const isBigDevice = useMediaQuery((theme: Theme) => theme.breakpoints.up('sm'));
  const [menuForRender, setMenuForRender] = useState(null);
  const [timer, setTimer] = useState(null);

  const updateWithTimer = (): void => {
    setMenuForRender(null);
    const newTimer = window.setTimeout(() => {
      setMenuForRender(menu);
      setTimer(null);
    }, ADDITIONAL_MENU_UPDATE);
    setTimer(newTimer);
  };

  const updateWithoutTimer = (): void => {
    if (timer) {
      window.clearTimeout(timer);
      updateWithTimer();
    } else {
      setMenuForRender(menu);
    }
  };

  useEffect(() => {
    updateWithoutTimer();
  }, [menu]);

  useEffect(() => {
    updateWithTimer();
  }, [reload]);

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
      <Fade in={Boolean(menuForRender)} timeout={ADDITIONAL_MENU_UPDATE}>
        <Box className={containerClassNames}>{menuForRender}</Box>
      </Fade>
    </Drawer>
  );
};

export default AdditionalMenu;
