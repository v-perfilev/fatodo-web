import {ReactElement} from 'react';
import {ACTION_TYPES} from '../actions/additional-menu.actions';

const initialState = {
  menu: null as ReactElement,
  reload: false,
};

export type AdditionalMenuState = Readonly<typeof initialState>;

export default (state: AdditionalMenuState = initialState, action): AdditionalMenuState => {
  switch (action.type) {
    case ACTION_TYPES.SET_MENU_WITH_RELOAD:
      return {
        menu: action.menu,
        reload: !state.reload,
      };
    case ACTION_TYPES.SET_MENU:
    case ACTION_TYPES.CLEAR_MENU:
      return {
        ...state,
        menu: action.menu,
      };
    default:
      return state;
  }
};
