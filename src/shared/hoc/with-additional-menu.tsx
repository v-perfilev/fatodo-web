import * as React from 'react';
import {ComponentType, FC, ReactElement, useState} from 'react';
import {Box, Theme, useMediaQuery} from '@material-ui/core';
import {additionalMenuStyles} from './_styles';
import AdditionalMenu from '../../components/common/layouts/additional-menu';
import csx from 'classnames';
import {AdditionalMenuContext} from '../contexts/additional-menu-context';

const withAdditionalMenu = (Component: ComponentType): FC => (props): ReactElement => {
  const classes = additionalMenuStyles();
  const [menu, setMenu] = useState<ReactElement>();
  const isBigDevice = useMediaQuery((theme: Theme) => theme.breakpoints.up('sm'));

  const rootClassNames = csx(classes.root, isBigDevice ? classes.rootMenuLeft : classes.rootMenuBottom);

  const updateMenu = (menu: ReactElement): void => {
    setMenu(menu);
  };

  const context = {menu, updateMenu};

  return (
    <AdditionalMenuContext.Provider value={context}>
      <Box className={rootClassNames}>
        <Box className={classes.container}>
          <Component {...props} />
        </Box>
        <AdditionalMenu />
      </Box>
    </AdditionalMenuContext.Provider>
  );
};

export default withAdditionalMenu;
