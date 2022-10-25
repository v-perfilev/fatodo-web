import React, {MutableRefObject, PropsWithChildren, useEffect, useRef} from 'react';
import {VariableSizeList} from 'react-window';
import {ListMeasurerCache} from './caches';

type VirtualizedListItemProps = PropsWithChildren<{
  index: number;
  keyExtractor: (index: number) => string;
  forceUpdate: () => void;
  measurerCache: ListMeasurerCache;
  listRef: MutableRefObject<VariableSizeList>;
}>;

const VirtualizedListItem = ({
  index,
  keyExtractor,
  forceUpdate,
  measurerCache,
  listRef,
  children,
}: VirtualizedListItemProps) => {
  const ref = useRef<HTMLDivElement>();

  const handleResize = (): void => {
    const key = keyExtractor(index);
    const height = ref.current?.clientHeight;
    const prevHeight = measurerCache.getHeight(key);
    if (height && height !== prevHeight) {
      height && measurerCache.setHeight(key, height);
      listRef.current?.resetAfterIndex(0, true);
      forceUpdate();
    }
  };

  useEffect(() => {
    // eslint-disable-next-line @typescript-eslint/ban-ts-ignore
    // @ts-ignore
    const resizer = new ResizeObserver(handleResize);
    resizer.observe(ref.current);
    return () => resizer.disconnect();
  }, []);

  return <div ref={ref}>{children}</div>;
};

export default VirtualizedListItem;
