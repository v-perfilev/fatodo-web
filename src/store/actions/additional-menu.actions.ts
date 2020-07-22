import {ReactElement} from 'react';

export const ACTION_TYPES = {
  SET_MENU: 'additionalMenuState/SET_MENU',
  CLEAR_MENU: 'additionalMenuState/CLEAR_MENU',
};

export const setMenu = (menu: ReactElement) => (dispatch): void =>
  dispatch({
    type: ACTION_TYPES.SET_MENU,
    menu,
  });

export const clearMenu = () => (dispatch): void =>
  dispatch({
    type: ACTION_TYPES.CLEAR_MENU,
    menu: null,
  });
