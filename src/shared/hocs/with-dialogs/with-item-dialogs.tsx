import * as React from 'react';
import {ComponentType, FC, ReactElement, useCallback, useEffect} from 'react';
import {useDialogContext} from '../../contexts/dialog-contexts/dialog-context';
import {ItemDialogContext} from '../../contexts/dialog-contexts/item-dialog-context';
import {Item} from '../../../models/item.model';
import ItemDeleteDialog, {
  defaultItemDeleteDialogProps,
  ItemDeleteDialogProps,
} from '../../../pages/item/dialogs/item-delete-dialog';

enum ItemDialogs {
  DELETE = 'ITEM_DELETE_DIALOG',
}

const withItemDialogs = (Component: ComponentType): FC => (props): ReactElement => {
  const {handleDialog, setDialogProps, clearDialogProps} = useDialogContext();

  const showItemDeleteDialog = useCallback(
    (item: Item, onSuccess?: () => void): void => {
      const show = true;
      const close = (): void => clearDialogProps(ItemDialogs.DELETE);
      const props = {item, show, close, onSuccess} as ItemDeleteDialogProps;
      setDialogProps(ItemDialogs.DELETE, props);
    },
    [setDialogProps, clearDialogProps]
  );

  const initDialogs = (): void => {
    handleDialog(ItemDialogs.DELETE, ItemDeleteDialog, defaultItemDeleteDialogProps);
  };

  useEffect(() => {
    initDialogs();
  }, []);

  const context = {
    showItemDeleteDialog,
  };

  return (
    <ItemDialogContext.Provider value={context}>
      <Component {...props} />
    </ItemDialogContext.Provider>
  );
};

export default withItemDialogs;
