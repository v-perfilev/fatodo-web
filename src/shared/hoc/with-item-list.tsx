import * as React from 'react';
import {ComponentType, FC, ReactElement, useEffect, useState} from 'react';
import {ItemListProvider} from '../contexts/item-list-context';
import {Item} from '../../models/item.model';

const withItemList = (Component: ComponentType): FC => (props): ReactElement => {
  const [items, setItems] = useState<Item[]>([]);
  const [loadItems, setLoadItems] = useState(() => (): void => {
    // important stub function
  });

  const context = {items, setItems, loadItems, setLoadItems};

  useEffect(() => {
    loadItems();
  }, [loadItems]);

  return (
    <ItemListProvider value={context}>
      <Component {...props} />
    </ItemListProvider>
  );
};

export default withItemList;
