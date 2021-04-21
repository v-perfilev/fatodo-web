import * as React from 'react';
import {ComponentType, useContext} from 'react';

interface DialogsState {
  handleDialog: (name: string, component: ComponentType, defaultProps: any) => void;
  setDialogProps: (name: string, props?: any) => void;
  clearDialogProps: (name: string) => void;
  clearAllDialogsProps: () => void;
}

export const DialogsContext = React.createContext<DialogsState>(null);
export const useDialogsContext = (): DialogsState => useContext(DialogsContext);
