import * as React from 'react';
import {FC, useEffect, useState} from 'react';
import {Box, Drawer, Fade, Theme, useMediaQuery} from '@material-ui/core';
import {additionalMenuStyles} from './_styles';
import Logo from '../../common/logo/logo';
import {RootState} from '../../../store';
import {connect, ConnectedProps} from 'react-redux';
import {RouteProps} from 'react-router-dom';
import {AdditionalMenuState} from '../../../store/rerducers/additional-menu.reducer';
import {compose} from 'recompose';
import csx from 'classnames';

const mapStateToProps = (state: RootState): AdditionalMenuState => state.additionalMenuState;
const connector = connect(mapStateToProps);

type Props = ConnectedProps<typeof connector> & RouteProps;

const AdditionalMenu: FC<Props> = ({menu}: Props) => {
  const classes = additionalMenuStyles();
  const isBigDevice = useMediaQuery((theme: Theme) => theme.breakpoints.up('sm'));
  const [menuForRender, setMenuForRender] = useState(null);

  useEffect(() => {
    setMenuForRender(null);
    setTimeout(() => setMenuForRender(menu), 500);
  }, [menu]);

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
      <Fade in={Boolean(menuForRender)} timeout={500}>
        <Box className={containerClassNames}>{menuForRender}</Box>
      </Fade>
    </Drawer>
  );
};

export default compose(connector)(AdditionalMenu);
