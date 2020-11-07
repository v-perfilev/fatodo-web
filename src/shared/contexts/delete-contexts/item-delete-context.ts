import * as React from 'react';
import {useContext} from 'react';
import {Item} from '../../../models/item.model';
import {DeleteState} from './types';

type ItemDeleteState = DeleteState<Item>;

export const ItemDeleteContext = React.createContext<ItemDeleteState>(null);
export const useItemDeleteContext = (): ItemDeleteState => useContext(ItemDeleteContext);
