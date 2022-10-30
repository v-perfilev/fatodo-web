import * as React from 'react';
import {ComponentType, ReactElement, useCallback, useMemo, useState} from 'react';
import {flowRight} from 'lodash';
import {DialogContext} from '../../contexts/dialogContexts/DialogContext';
import withItemDialogs from './withItemDialogs';
import {Box, SxProps} from '@mui/material';

type ComponentWithProps = {
  component: ComponentType;
  defaultProps: any;
};

const withDialogs = (Component: ComponentType) => (props: any) => {
  const [dialogMap, setDialogMap] = useState<Map<string, ComponentWithProps>>(new Map());
  const [propsMap, setPropsMap] = useState<Map<string, any>>(new Map());

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
    setPropsMap((prevState) => {
      prevState.set(name, props);
      return new Map(prevState);
    });
  }, []);

  const updateDialogProps = useCallback((name: string, props: any): void => {
    setPropsMap((prevState) => {
      const oldProps = prevState.has(name) ? prevState.get(name) : dialogMap.get(name).defaultProps;
      prevState.set(name, {...oldProps, ...props});
      return new Map(prevState);
    });
  }, []);

  const clearDialogProps = useCallback((name: string): void => {
    setPropsMap((prevState) => {
      prevState.delete(name);
      return new Map(prevState);
    });
  }, []);

  const clearAllDialogsProps = useCallback((): void => {
    setPropsMap(new Map());
  }, []);

  const dialogs = useMemo<ReactElement[]>(() => {
    return Array.from(dialogMap.keys()).map((name, index) => {
      const DialogComponent = dialogMap.get(name).component;
      const props = propsMap.has(name) ? propsMap.get(name) : dialogMap.get(name).defaultProps;
      return <DialogComponent {...props} key={index} />;
    });
  }, [dialogMap, propsMap]);

  const context = useMemo(
    () => ({
      handleDialog,
      setDialogProps,
      updateDialogProps,
      clearDialogProps,
      clearAllDialogsProps,
    }),
    [handleDialog, setDialogProps, updateDialogProps, clearDialogProps, clearAllDialogsProps],
  );

  return (
    <DialogContext.Provider value={context}>
      <Component {...props} />
      <Box sx={containerStyles}>{dialogs}</Box>
    </DialogContext.Provider>
  );
};

const containerStyles: SxProps = {
  width: 0,
  height: 0,
};

export default flowRight([withDialogs, withItemDialogs]);
