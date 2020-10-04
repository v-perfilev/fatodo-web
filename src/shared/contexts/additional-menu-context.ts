import * as React from 'react';
import {ReactElement, useContext} from 'react';

interface AdditionalMenuState {
  menu: ReactElement;
  reload: boolean;
  updateMenu: (menu: ReactElement, reload?: boolean) => void;
}

export const AdditionalMenuContext = React.createContext<AdditionalMenuState>(null);
export const AdditionalMenuProvider = AdditionalMenuContext.Provider;
export const useAdditionalMenuContext = (): AdditionalMenuState => useContext(AdditionalMenuContext);
