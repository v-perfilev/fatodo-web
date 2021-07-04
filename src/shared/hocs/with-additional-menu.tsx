import * as React from 'react';
import {ComponentType, FC, ReactElement, useState} from 'react';
import AdditionalMenu from '../../components/layouts/additional-menu';
import {AdditionalMenuContext} from '../contexts/additional-menu-context/additional-menu-context';
import {AdditionalMenuItem} from '../contexts/additional-menu-context/types';

const withAdditionalMenu = (Component: ComponentType): FC => (props): ReactElement => {
  const [menu, setMenu] = useState<AdditionalMenuItem[]>();
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
