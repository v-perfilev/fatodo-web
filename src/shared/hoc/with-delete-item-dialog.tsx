import * as React from 'react';
import {ComponentType, FC, ReactElement, useState} from 'react';
import {DeleteItemProvider} from '../contexts/delete-item-context';
import {DeleteItemDialog} from '../../components/common/dialogs/delete-item-dialog';
import {Item} from '../../models/item.model';

const withDeleteItemDialog = (Component: ComponentType): FC => (props): ReactElement => {
  const [itemToDelete, setItemToDelete] = useState<Item>(null);
  const [onDeleteItemSuccess, setOnDeleteItemSuccess] = useState(() => (): void => {
    // important stub function
  });

  const context = {setItemToDelete, setOnDeleteItemSuccess};

  return (
    <DeleteItemProvider value={context}>
      <DeleteItemDialog item={itemToDelete} setItem={setItemToDelete} onSuccess={onDeleteItemSuccess} />
      <Component {...props} />
    </DeleteItemProvider>
  );
};

export default withDeleteItemDialog;
