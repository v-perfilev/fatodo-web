import * as React from 'react';
import {ComponentType, FC, ReactElement, useState} from 'react';
import {Item} from '../../models/item.model';
import {ItemViewProvider} from '../contexts/item-view-context';

const withItemView = (Component: ComponentType): FC => (props): ReactElement => {
  const [item, setItem] = useState<Item>(null);

  const context = {item, setItem};

  return (
    <ItemViewProvider value={context}>
      <Component {...props} />
    </ItemViewProvider>
  );
};

export default withItemView;
