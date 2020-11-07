import * as React from 'react';
import {ComponentType, FC, ProviderProps, ReactElement, useEffect, useState} from 'react';
import {ViewState} from '../../contexts/view-contexts/types';

const withView = (Provider: ComponentType<ProviderProps<ViewState<any>>>) => (Component: ComponentType): FC => (
  props
): ReactElement => {
  const [obj, setObj] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [load, setLoad] = useState(() => (): void => {
    // important stub function
  });

  const context = {obj, setObj, load, setLoad, loading};

  useEffect(() => {
    setLoading(false);
  }, [obj]);

  useEffect(() => {
    setLoading(true);
    load();
  }, [load]);

  return (
    <Provider value={context}>
      <Component {...props} />
    </Provider>
  );
};

export default withView;
