import * as React from 'react';
import {ReactElement, useContext} from 'react';

interface AdditionalMenuState {
  menu: ReactElement;
  updateMenu: (menu: ReactElement) => void;
}

export const AdditionalMenuContext = React.createContext<AdditionalMenuState>(null);
export const AdditionalMenuProvider = AdditionalMenuContext.Provider;
export const useAdditionalMenuContext = (): AdditionalMenuState => useContext(AdditionalMenuContext);
