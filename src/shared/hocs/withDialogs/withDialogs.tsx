import * as React from 'react';
import {ComponentType, memo, ReactElement, useCallback, useMemo, useState} from 'react';
import {flowRight} from 'lodash';
import {DialogComponentWithProps, DialogContext, useDialogContext} from '../../contexts/dialogContexts/DialogContext';
import withItemDialogs from './withItemDialogs';
import {Box, SxProps} from '@mui/material';
import withChatDialogs from './withChatDialogs';
import withCommentDialogs from './withCommentDialogs';
import withContactDialogs from './withContactDialogs';
import withGroupDialogs from './withGroupDialogs';
import withCalendarDialogs from './withCalendarDialogs';
import withAccountDialogs from './withAccountDialogs';

const withDialogs = (Component: ComponentType) => (props: any) => {
  const [dialogMap, setDialogMap] = useState<Map<string, DialogComponentWithProps>>(new Map());
  const [propMap, setPropMap] = useState<Map<string, any>>(new Map());

  const handleDialog = useCallback((name: string, component: ComponentType, defaultProps: any): void => {
    const isDialogNotInMap = !dialogMap.has(name);
    if (isDialogNotInMap) {
      setDialogMap((prevState) => {
        const componentWithProps = {component, defaultProps};
        prevState.set(name, componentWithProps);
        return new Map(prevState);
      });
    }
  }, []);

  const setDialogProps = useCallback((name: string, props: any): void => {
    setPropMap((prevState) => {
      prevState.set(name, props);
      return new Map(prevState);
    });
  }, []);

  const updateDialogProps = useCallback((name: string, props: any): void => {
    setPropMap((prevState) => {
      const oldProps = prevState.has(name) ? prevState.get(name) : dialogMap.get(name).defaultProps;
      prevState.set(name, {...oldProps, ...props});
      return new Map(prevState);
    });
  }, []);

  const clearDialogProps = useCallback((name: string): void => {
    setPropMap((prevState) => {
      prevState.delete(name);
      return new Map(prevState);
    });
  }, []);

  const clearAllDialogsProps = useCallback((): void => {
    setPropMap(new Map());
  }, []);

  const context = useMemo(
    () => ({
      dialogMap,
      propMap,
      handleDialog,
      setDialogProps,
      updateDialogProps,
      clearDialogProps,
      clearAllDialogsProps,
    }),
    [dialogMap, propMap, handleDialog, setDialogProps, updateDialogProps, clearDialogProps, clearAllDialogsProps],
  );

  return (
    <DialogContext.Provider value={context}>
      <Component dialogsMap={dialogMap} propsMap={propMap} {...props} />
    </DialogContext.Provider>
  );
};

const withDialogsBox = (Component: ComponentType) => (props: any) => {
  const {dialogMap, propMap} = useDialogContext();

  const dialogs = useMemo<ReactElement[]>(() => {
    return Array.from(dialogMap.keys()).map((name, index) => {
      const DialogComponent = dialogMap.get(name).component;
      const props = propMap.has(name) ? propMap.get(name) : dialogMap.get(name).defaultProps;
      return <DialogComponent {...props} key={index} />;
    });
  }, [dialogMap, propMap]);

  return (
    <>
      <Component {...props} />
      <Box sx={containerStyles}>{dialogs}</Box>
    </>
  );
};

const containerStyles: SxProps = {
  width: 0,
  height: 0,
};

export default flowRight([
  memo,
  withDialogs,
  withAccountDialogs,
  withCalendarDialogs,
  withChatDialogs,
  withCommentDialogs,
  withContactDialogs,
  withGroupDialogs,
  withItemDialogs,
  withDialogsBox,
]);
