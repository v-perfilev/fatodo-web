import * as React from 'react';
import {ComponentType, FC, memo, ReactElement, useMemo, useState} from 'react';
import {DialogContext} from '../../contexts/dialog-contexts/dialog-context';
import {compose} from 'recompose';

type ComponentWithProps = {
  component: ComponentType;
  defaultProps: any;
};

const withDialogs = (Component: ComponentType): FC => (props): ReactElement => {
  const [dialogMap, setDialogMap] = useState<Map<string, ComponentWithProps>>(new Map());
  const [propsMap, setPropsMap] = useState<Map<string, any>>(new Map());

  const handleDialog = (name: string, component: ComponentType, defaultProps: any): void => {
    const isDialogNotInMap = !dialogMap.has(name);
    if (isDialogNotInMap) {
      setDialogMap((prevState) => {
        const componentWithProps = {component, defaultProps};
        prevState.set(name, componentWithProps);
        return new Map(prevState);
      });
    }
  };

  const setDialogProps = (name: string, props: any): void => {
    setPropsMap((prevState) => {
      prevState.set(name, props);
      return new Map(prevState);
    });
  };

  const updateDialogProps = (name: string, props: any): void => {
    setPropsMap((prevState) => {
      const oldProps = prevState.has(name) ? prevState.get(name) : dialogMap.get(name).defaultProps;
      prevState.set(name, {...oldProps, ...props});
      return new Map(prevState);
    });
  };

  const clearDialogProps = (name: string): void => {
    setPropsMap((prevState) => {
      prevState.delete(name);
      return new Map(prevState);
    });
  };

  const clearAllDialogsProps = (): void => {
    setPropsMap(new Map());
  };

  const dialogs = useMemo(
    () =>
      Array.from(dialogMap.keys()).map((name, index) => {
        const DialogComponent = dialogMap.get(name).component;
        const props = propsMap.has(name) ? propsMap.get(name) : dialogMap.get(name).defaultProps;
        return <DialogComponent {...props} key={index} />;
      }),
    [dialogMap, propsMap]
  );

  const context = {
    handleDialog,
    setDialogProps,
    updateDialogProps,
    clearDialogProps,
    clearAllDialogsProps,
  };

  return (
    <DialogContext.Provider value={context}>
      <Component {...props} />
      {dialogs}
    </DialogContext.Provider>
  );
};

export default compose(withDialogs, memo);