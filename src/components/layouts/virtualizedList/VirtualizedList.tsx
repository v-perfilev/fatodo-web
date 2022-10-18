import React, {
  MutableRefObject,
  PropsWithChildren,
  ReactElement,
  Ref,
  RefObject,
  useCallback,
  useEffect,
  useImperativeHandle,
  useMemo,
  useRef,
  useState,
} from 'react';
import {ListMeasurerCache} from './caches';
import {ListChildComponentProps, ListOnItemsRenderedProps, ListOnScrollProps, VariableSizeList} from 'react-window';
import AutoSizer from 'react-virtualized-auto-sizer';
import InfiniteLoader from 'react-window-infinite-loader';
import {RefUtils} from '../../../shared/utils/RefUtils';

export type VirtualizedListMethods = {
  visibleItems: number[];
  clearCache: (index?: number) => void;
  scrollToPosition: (position: number) => void;
  scrollToTop: () => void;
  scrollToBottom: () => void;
  isScrolledToTop: boolean;
  isScrolledToBottom: boolean;
};

type VirtualizedListProps<T> = {
  itemRenderer: (params: ListChildComponentProps) => ReactElement;
  itemData: T[];
  itemCount: number;
  loadMoreItems?: () => Promise<void>;
  itemHeight?: number;
  keyExtractor?: (index: number) => string;
  reverseOrder?: boolean;
  virtualizedListRef?: Ref<VirtualizedListMethods>;
};

type VirtualizedListMeasurerProps = PropsWithChildren<{
  index: number;
  itemKey: (index: number) => string;
  measurerCache: ListMeasurerCache;
  listRef: MutableRefObject<VariableSizeList>;
}>;

const VirtualizedListMeasurer = ({index, itemKey, measurerCache, listRef, children}: VirtualizedListMeasurerProps) => {
  const ref = useRef<HTMLDivElement>();

  const handleResize = (): void => {
    const key = itemKey(index);
    const height = ref.current?.clientHeight;
    height && measurerCache.setHeight(key, height);
    listRef.current?.resetAfterIndex(index, true);
  };

  // eslint-disable-next-line @typescript-eslint/ban-ts-ignore
  // @ts-ignore
  const resizer = new ResizeObserver(handleResize);

  useEffect(() => {
    resizer.observe(ref.current);
    return () => resizer.disconnect();
  }, []);

  return <div ref={ref}>{children}</div>;
};

const VirtualizedList = (props: VirtualizedListProps<any>) => {
  const {itemRenderer, itemData, itemCount, loadMoreItems} = props;
  const {itemHeight, keyExtractor, reverseOrder, virtualizedListRef} = props;
  const [visibleItems, setVisibleItems] = useState<number[]>([]);
  const [scroll, setScroll] = useState<ListOnScrollProps>();
  const measurerCache = useRef<ListMeasurerCache>(new ListMeasurerCache()).current;
  const listRef = useRef<VariableSizeList>();

  const isDynamic = useMemo<boolean>(() => itemHeight === undefined, []);

  // OUTER METHODS

  const clearCache = useCallback(
    (index?: number): void => {
      const key = index ? keyExtractor(index) : undefined;
      measurerCache.clear(key);
    },
    [keyExtractor],
  );

  const getScrollHeight = useCallback((): number => {
    return isDynamic ? measurerCache.getTotalHeight() : itemHeight * itemData.length;
  }, [isDynamic, itemData]);

  const scrollToPosition = useCallback((position: number): void => {
    listRef.current?.scrollTo(position);
  }, []);

  const scrollToTop = useCallback((): void => {
    listRef.current?.scrollTo(0);
  }, []);

  const scrollToBottom = useCallback((): void => {
    listRef.current?.scrollToItem(itemData.length - 1);
  }, [itemData]);

  const isScrolledToTop = useMemo<boolean>(() => {
    const scrollTop = scroll?.scrollOffset;
    return scrollTop === 0;
  }, [scroll]);

  const isScrolledToBottom = useMemo<boolean>(() => {
    const clientHeight = listRef.current?.props.height as number;
    const scrollTop = scroll?.scrollOffset;
    return !clientHeight || getScrollHeight() <= Math.ceil(scrollTop + clientHeight);
  }, [scroll, getScrollHeight]);

  useImperativeHandle(
    virtualizedListRef,
    (): VirtualizedListMethods => ({
      visibleItems,
      clearCache,
      scrollToPosition,
      scrollToTop,
      scrollToBottom,
      isScrolledToTop,
      isScrolledToBottom,
    }),
    [visibleItems, clearCache, scrollToPosition, scrollToTop, scrollToBottom, isScrolledToTop, isScrolledToBottom],
  );

  // MAIN COMPONENT CONTENT

  const height = getScrollHeight();
  const prevHeight = RefUtils.usePrevious(height);

  useEffect(() => {
    const clientHeight = listRef.current?.props.height;
    if (reverseOrder && height > clientHeight) {
      if (isScrolledToBottom) {
        scrollToPosition(height);
      } else {
        const position = height - prevHeight + scroll?.scrollOffset;
        scrollToPosition(position);
      }
    }
    listRef.current?.resetAfterIndex(0, true);
  }, [height, prevHeight]);

  // RENDER PARAMS

  const isItemLoaded = useCallback(
    (index: number): boolean => {
      const loadedCount = itemData.length;
      const allLoaded = loadedCount === itemData.length;
      return reverseOrder ? index > 0 || allLoaded : index < loadedCount || allLoaded;
    },
    [itemData, itemCount],
  );

  const getItemSize = useCallback(
    (index: number): number => {
      return isDynamic ? measurerCache.getHeight(keyExtractor(index)) : itemHeight;
    },
    [keyExtractor],
  );

  const updateVisibleItems = useCallback((props: ListOnItemsRenderedProps): void => {
    const firstVisible = props.visibleStartIndex;
    const visibleItemsCount = props.visibleStopIndex - props.visibleStartIndex + 1;
    const visibleItems = Array.from({length: visibleItemsCount}, (_, i) => i + firstVisible);
    setVisibleItems(visibleItems);
  }, []);

  const renderer = useCallback(
    (params: ListChildComponentProps) => {
      return isDynamic ? (
        <div style={params.style}>
          <VirtualizedListMeasurer
            index={params.index}
            itemKey={keyExtractor}
            measurerCache={measurerCache}
            listRef={listRef}
          >
            {itemRenderer(params)}
          </VirtualizedListMeasurer>
        </div>
      ) : (
        <div style={params.style}>{itemRenderer(params)}</div>
      );
    },
    [itemRenderer, keyExtractor],
  );

  // RENDER METHODS

  return (
    <AutoSizer>
      {({height, width}): ReactElement => (
        <>
          <InfiniteLoader isItemLoaded={isItemLoaded} loadMoreItems={loadMoreItems} itemCount={itemCount}>
            {({onItemsRendered, ref}) => (
              <VariableSizeList
                ref={RefUtils.merge(listRef, ref)}
                height={height}
                width={width}
                itemData={itemData}
                itemCount={itemCount}
                itemSize={getItemSize}
                onScroll={setScroll}
                onItemsRendered={(props) => {
                  onItemsRendered(props);
                  updateVisibleItems(props);
                }}
              >
                {renderer}
              </VariableSizeList>
            )}
          </InfiniteLoader>
        </>
      )}
    </AutoSizer>
  );
};

export default VirtualizedList;
