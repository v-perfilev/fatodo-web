import * as React from 'react';
import {ComponentType, FC, MutableRefObject, ReactElement, useEffect, useRef, useState} from 'react';
import {useResize} from '../hooks/use-resize';

interface Size {
  width: number;
  height: number;
}

export type SizeProps = {
  gridRef: MutableRefObject<any>;
  sizes: Size[];
}

const withSizes = (Component: ComponentType<SizeProps>): FC => (props): ReactElement => {
  const windowSize = useResize();
  const gridRef = useRef(null);
  const [sizes, setSizes] = useState<Size[]>([]);

  useEffect(() => {
    const newSizes = [];
    if (gridRef && gridRef.current) {
      let i = 0;
      let ref = gridRef.current;
      while (ref && i < 3) {
        newSizes.push({width: ref.clientWidth, height: ref.clientHeight});
        ref = ref.childNodes[0];
        i++;
      }
    }
    setSizes(newSizes);
  }, [windowSize, gridRef]);

  return (
    <Component gridRef={gridRef} sizes={sizes} {...props} />
  );
};

export default withSizes;
