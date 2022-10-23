import * as React from 'react';
import {ComponentType, FC, ReactElement, useState} from 'react';
import AdditionalMenu from '../../../components/layouts/AdditionalMenu';
import {AdditionalMenuContext} from '../../contexts/menu-contexts/additional-menu-context';
import {MenuElement} from '../../contexts/menu-contexts/types';

const withAdditionalMenu = (Component: ComponentType): FC => (props): ReactElement => {
  const [menu, setMenu] = useState<MenuElement[]>();
  const [loading, setLoading] = useState<boolean>();

  const context = {menu, setMenu, loading, setLoading};

  return (
    <AdditionalMenuContext.Provider value={context}>
      <AdditionalMenu />
      <Component {...props} />
    </AdditionalMenuContext.Provider>
  );
};

export default withAdditionalMenu;