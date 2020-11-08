import * as React from 'react';
import {ComponentType, FC, ProviderProps, ReactElement, useEffect, useState} from 'react';

const withList = (Provider: ComponentType<ProviderProps<ListState<any>>>) => (Component: ComponentType): FC => (
  props
): ReactElement => {
  const [objs, setObjs] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [load, setLoad] = useState(() => (): void => {
    // important stub function
  });

  const context = {objs, setObjs, load, setLoad, loading};

  useEffect(() => {
    setLoading(false);
  }, [objs]);

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

export default withList;
