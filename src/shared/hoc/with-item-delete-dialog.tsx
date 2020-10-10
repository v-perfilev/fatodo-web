import * as React from 'react';
import {ComponentType, FC, ReactElement, useState} from 'react';
import {ItemDeleteContext} from '../contexts/item-delete-context';
import {DeleteItemDialog} from '../../components/common/dialogs/delete-item-dialog';
import {Item} from '../../models/item.model';

const withItemDeleteDialog = (Component: ComponentType): FC => (props): ReactElement => {
  const [itemToDelete, setItemToDelete] = useState<Item>(null);
  const [onDeleteItemSuccess, setOnDeleteItemSuccess] = useState(() => (): void => {
    // important stub function
  });

  const context = {setItemToDelete, setOnDeleteItemSuccess};

  return (
    <ItemDeleteContext.Provider value={context}>
      <DeleteItemDialog item={itemToDelete} setItem={setItemToDelete} onSuccess={onDeleteItemSuccess} />
      <Component {...props} />
    </ItemDeleteContext.Provider>
  );
};

export default withItemDeleteDialog;
