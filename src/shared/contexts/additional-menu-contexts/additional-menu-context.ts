import {createContext, useContext} from 'react';
import {AdditionalMenuItem} from './types';

interface AdditionalMenuState {
  menu: AdditionalMenuItem[];
  setMenu: (menu: AdditionalMenuItem[]) => void;
  loading: boolean;
  setLoading: (loading: boolean) => void;
}

export const AdditionalMenuContext = createContext<AdditionalMenuState>(null);
export const useAdditionalMenuContext = (): AdditionalMenuState => useContext(AdditionalMenuContext);
