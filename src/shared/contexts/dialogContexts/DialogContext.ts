import * as React from 'react';
import {ComponentType, useContext} from 'react';

export type DialogComponentWithProps = {
  component: ComponentType;
  defaultProps: any;
};

export type HandleDialogFunc = (name: string, component: ComponentType<any>, defaultProps: any) => void;
export type SetDialogFunc = (name: string, props: any) => void;
export type UpdateDialogFunc = (name: string, props: any) => void;
export type ClearDialogFunc = (name: string) => void;
export type ClearAllDialogFunc = () => void;

interface DialogState {
  dialogMap: Map<string, DialogComponentWithProps>;
  propMap: Map<string, any>;
  handleDialog: HandleDialogFunc;
  setDialogProps: SetDialogFunc;
  updateDialogProps: UpdateDialogFunc;
  clearDialogProps: ClearDialogFunc;
  clearAllDialogsProps: ClearAllDialogFunc;
}

export const DialogContext = React.createContext<DialogState>(null);
export const useDialogContext = (): DialogState => useContext(DialogContext);
