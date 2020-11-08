import * as React from 'react';
import {ComponentType, FC, ProviderProps, ReactElement, useState} from 'react';
import {DeleteDialogProps, DeleteState} from '../../contexts/delete-contexts/types';

const withDeleteDialog = (
  Provider: ComponentType<ProviderProps<DeleteState<any>>>,
  DeleteDialog: ComponentType<DeleteDialogProps<any>>
) => (Component: ComponentType): FC => (props): ReactElement => {
  const [obj, setObj] = useState<any>(null);
  const [onSuccess, setOnSuccess] = useState(() => (): void => {
    // important stub function
  });

  const context = {setObj, setOnSuccess};

  return (
    <Provider value={context}>
      <DeleteDialog obj={obj} setObj={setObj} onSuccess={onSuccess} />
      <Component {...props} />
    </Provider>
  );
};

export default withDeleteDialog;
