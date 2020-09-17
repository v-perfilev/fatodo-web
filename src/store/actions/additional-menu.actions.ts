import {ReactElement} from 'react';

export const ACTION_TYPES = {
  SET_MENU: 'additionalMenuState/SET_MENU',
  SET_MENU_WITH_RELOAD: 'additionalMenuState/SET_MENU_WITH_RELOAD',
  CLEAR_MENU: 'additionalMenuState/CLEAR_MENU',
};

export const setMenu = (menu: ReactElement, reload?: boolean) => (dispatch): void =>
  dispatch({
    type: reload ? ACTION_TYPES.SET_MENU_WITH_RELOAD : ACTION_TYPES.SET_MENU,
    menu,
  });

export const clearMenu = () => (dispatch): void =>
  dispatch({
    type: ACTION_TYPES.CLEAR_MENU,
    menu: null,
  });
