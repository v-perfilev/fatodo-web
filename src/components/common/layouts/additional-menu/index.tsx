import * as React from 'react';
import {FC, useEffect, useState} from 'react';
import {Box, Drawer, Fade, Theme, useMediaQuery} from '@material-ui/core';
import {additionalMenuStyles} from './_styles';
import {RootState} from '../../../../store';
import {connect, ConnectedProps} from 'react-redux';
import {RouteProps} from 'react-router-dom';
import {AdditionalMenuState} from '../../../../store/rerducers/additional-menu.reducer';
import {compose} from 'recompose';
import csx from 'classnames';
import {ADDITIONAL_MENU_UPDATE} from '../../../../constants';
import {Logo} from '../logo';

const mapStateToProps = (state: RootState): AdditionalMenuState => state.additionalMenuState;
const connector = connect(mapStateToProps);

type Props = ConnectedProps<typeof connector> & RouteProps;

const AdditionalMenu: FC<Props> = ({menu, reload}: Props) => {
  const classes = additionalMenuStyles();
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

export default compose(connector)(AdditionalMenu);
