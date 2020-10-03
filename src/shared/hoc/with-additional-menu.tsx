import * as React from 'react';
import {ComponentType, FC, ReactElement, useContext, useState} from 'react';
import {Box, Theme, useMediaQuery} from '@material-ui/core';
import {additionalMenuStyles} from './_styles';
import AdditionalMenu from '../../components/common/layouts/additional-menu';
import csx from 'classnames';

interface AdditionalMenuState {
  menu: ReactElement;
  reload: boolean;
  updateMenu: (menu: ReactElement, reload?: boolean) => void;
}

export const AdditionalMenuContext = React.createContext<AdditionalMenuState>(null);
const AdditionalMenuProvider = AdditionalMenuContext.Provider;
export const useAdditionalMenuContext = (): AdditionalMenuState => useContext(AdditionalMenuContext);

const withAdditionalMenu = (Component: ComponentType): FC => (props): ReactElement => {
  const classes = additionalMenuStyles();
  const [menu, setMenu] = useState<ReactElement>();
  const [reload, setReload] = useState<boolean>();

  const isBigDevice = useMediaQuery((theme: Theme) => theme.breakpoints.up('sm'));
  const rootClassNames = csx(classes.root, isBigDevice ? classes.rootMenuLeft : classes.rootMenuBottom);

  const updateMenu = (menu: ReactElement, reload?: boolean): void => {
    setMenu(menu);
    if (reload) {
      setReload((prevState) => !prevState);
    }
  };

  const context = {menu, reload, updateMenu};

  return (
    <AdditionalMenuProvider value={context}>
      <Box className={rootClassNames}>
        <Box className={classes.container}>
          <Component {...props} />
        </Box>
        <AdditionalMenu />
      </Box>
    </AdditionalMenuProvider>
  );
};

export default withAdditionalMenu;
