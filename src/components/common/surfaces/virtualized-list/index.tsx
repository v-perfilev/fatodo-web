import React, {
  FC,
  ReactElement,
  Ref,
  useCallback,
  useEffect,
  useImperativeHandle,
  useMemo,
  useRef,
  useState
} from 'react';
import {ListKeysCache, ListMeasurerCache} from './_caches';
import {ListOnItemsRenderedProps, ListOnScrollProps, VariableSizeList} from 'react-window';
import AutoSizer from 'react-virtualized-auto-sizer';
import InfiniteLoader from 'react-window-infinite-loader';
import VirtualizedListMeasurer from './virtualized-list-measurer';
import {RefUtils} from '../../../../shared/utils/ref.utils';
import {ListItemDataProps, ListItemProps, OnItemsRendered} from './types';

type Props = {
  itemRenderer: (params: ListItemProps) => ReactElement;
  itemData: ListItemDataProps;
  loadMoreItems: () => Promise<void>;
  allLoaded: boolean;
  itemHeight?: number;
  itemKey?: (index: number) => string;
  reverseOrder?: boolean;
  virtualizedListRef?: Ref<VirtualizedListMethods>;
};

export type VirtualizedListMethods = {
  clearCache: (index?: number) => void;
  scrollToPosition: (position: number) => void;
  scrollToTop: () => void;
  scrollToBottom: () => void;
  isScrolledToTop: boolean;
  isScrolledToBottom: boolean;
};

export const VirtualizedList: FC<Props> = (props: Props) => {
  const {itemRenderer, itemData, loadMoreItems, allLoaded} = props;
  const {itemHeight, itemKey, reverseOrder, virtualizedListRef} = props;
  const listRef = useRef<VariableSizeList>();
  const [scroll, setScroll] = useState<ListOnScrollProps>();
  const [loading, setLoading] = useState<boolean>(false);
  const [visibleItems, setVisibleItems] = useState<number[]>([]);
  const [keyCache] = useState<ListKeysCache>(new ListKeysCache());
  const [measurerCache] = useState<ListMeasurerCache>(new ListMeasurerCache());
  const [, updateState] = useState<{}>();

  const forceUpdate = useCallback(() => {
    updateState({});
  }, []);

  const loadedLength = useMemo<number>(() => {
    return itemData.items.length;
  }, [itemData]);

  const isDynamic = useMemo<boolean>(() => {
    return itemHeight === undefined && itemKey !== undefined;
  }, []);

  // OUTER METHODS

  const clearCache = useCallback((index?: number): void => {
    const key = keyCache.get(index);
    keyCache.clear(index);
    measurerCache.clear(key);
  }, []);

  const getScrollHeight = useCallback((): number => {
    return isDynamic ? measurerCache.getTotalHeight() : itemHeight * loadedLength;
  }, [isDynamic, loadedLength]);

  const scrollToPosition = useCallback((position: number): void => {
    listRef.current?.scrollTo(position);
  }, []);

  const scrollToTop = useCallback((): void => {
    listRef.current?.scrollTo(0);
  }, []);

  const scrollToBottom = useCallback((): void => {
    listRef.current?.scrollToItem(loadedLength - 1);
  }, [loadedLength]);

  const isScrolledToTop = useMemo<boolean>(() => {
    const scrollTop = scroll?.scrollOffset;
    return scrollTop === 0;
  }, [scroll]);

  const isScrolledToBottom = useMemo<boolean>(() => {
    const clientHeight = listRef.current?.props.height as number;
    const scrollTop = scroll?.scrollOffset;
    return !clientHeight || getScrollHeight() <= scrollTop + clientHeight;
  }, [scroll, getScrollHeight]);

  useImperativeHandle(
    virtualizedListRef,
    (): VirtualizedListMethods => ({
      clearCache,
      scrollToPosition,
      scrollToTop,
      scrollToBottom,
      isScrolledToTop,
      isScrolledToBottom
    }),
    [clearCache, scrollToPosition, scrollToTop, scrollToBottom, isScrolledToTop, isScrolledToBottom]
  );

  // MAIN COMPONENT CONTENT

  const height = getScrollHeight();
  const prevHeight = RefUtils.usePrevious(height);

  const scrollAndRefresh = useCallback((): void => {
    if (reverseOrder && loading) {
      const position = height - prevHeight + scroll?.scrollOffset;
      scrollToPosition(position);
      setLoading(false);
    } else if (reverseOrder && isScrolledToBottom) {
      scrollToPosition(height);
    }
    listRef.current?.resetAfterIndex(0, true);
  }, [height, prevHeight, loading, scrollToPosition, isScrolledToBottom]);

  useEffect(() => {
    scrollAndRefresh();
  }, [height]);

  // RENDER PARAMS

  const itemCount = useMemo<number>(() => {
    return allLoaded ? loadedLength : loadedLength + 1;
  }, [allLoaded, loadedLength]);

  const isItemLoaded = useCallback(
    (index: number): boolean => {
      return reverseOrder ? (index > 0 ? true : allLoaded) : index < loadedLength;
    },
    [allLoaded, loadedLength, reverseOrder]
  );

  const wrappedItemRenderer = useCallback(
    (params: ListItemProps): ReactElement => {
      const index = params.index;
      const style = {...params.style, overflow: 'hidden'};
      const isVisible = visibleItems.includes(index);
      return itemRenderer({...params, style, isVisible});
    },
    [itemRenderer]
  );

  const wrappedOnItemsRendered = useCallback(
    (onItemsRendered: OnItemsRendered) => (props: ListOnItemsRenderedProps): void => {
      const firstVisible = props.visibleStartIndex;
      const visibleItemsCount = props.visibleStopIndex - props.visibleStartIndex + 1;
      const visibleItems = Array.from({length: visibleItemsCount}, (_, i) => i + firstVisible);
      setVisibleItems(visibleItems);
      onItemsRendered(props);
    },
    []
  );

  const wrappedIsItemLoaded = useCallback(
    (index: number): boolean => {
      return loading || isItemLoaded(index);
    },
    [loading, isItemLoaded]
  );

  const wrappedLoadMoreRows = useCallback((): Promise<void> => {
    return new Promise((resolve) => {
      setLoading(true);
      loadMoreItems()
        .catch(() => setLoading(false))
        .finally(() => resolve());
    });
  }, [loadMoreItems]);

  const getItemSize = useCallback(
    (index: number): number => {
      return itemHeight || measurerCache.getHeight(keyCache.get(index));
    },
    [itemHeight]
  );

  const wrappedInitialScrollOffset = useMemo<number>(() => {
    return reverseOrder ? Number.MAX_VALUE : 0;
  }, []);

  // RENDER METHODS

  const measurer = (
    <VirtualizedListMeasurer
      itemRenderer={itemRenderer}
      itemData={itemData}
      itemKey={itemKey}
      measurerCache={measurerCache}
      keyCache={keyCache}
      afterMeasured={forceUpdate}
    />
  );

  return (
    <AutoSizer>
      {({height, width}): ReactElement => (
        <>
          {isDynamic && measurer}
          <InfiniteLoader isItemLoaded={wrappedIsItemLoaded} loadMoreItems={wrappedLoadMoreRows} itemCount={itemCount}>
            {({onItemsRendered, ref}): ReactElement => (
              <VariableSizeList
                ref={RefUtils.mergeRefs(listRef, ref)}
                height={height}
                width={width}
                itemData={itemData}
                itemCount={loadedLength}
                itemSize={getItemSize}
                initialScrollOffset={wrappedInitialScrollOffset}
                onItemsRendered={wrappedOnItemsRendered(onItemsRendered)}
                onScroll={setScroll}
              >
                {wrappedItemRenderer}
              </VariableSizeList>
            )}
          </InfiniteLoader>
        </>
      )}
    </AutoSizer>
  );
};
