import {createContext, useContext} from 'react';
import {MenuElement} from './types';

interface AdditionalMenuState {
  menu: MenuElement[];
  setMenu: (menu: MenuElement[]) => void;
  loading: boolean;
  setLoading: (loading: boolean) => void;
}

export const AdditionalMenuContext = createContext<AdditionalMenuState>(null);
export const useAdditionalMenuContext = (): AdditionalMenuState => useContext(AdditionalMenuContext);
