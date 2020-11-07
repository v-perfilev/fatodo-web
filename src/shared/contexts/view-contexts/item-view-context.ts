import * as React from 'react';
import {useContext} from 'react';
import {Item} from '../../../models/item.model';
import {ViewState} from './types';

type ItemViewState = ViewState<Item>;

export const ItemViewContext = React.createContext<ItemViewState>(null);
export const useItemViewContext = (): ItemViewState => useContext(ItemViewContext);
