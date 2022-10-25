import React, {
  CSSProperties,
  memo,
  ReactElement,
  Ref,
  useCallback,
  useEffect,
  useImperativeHandle,
  useMemo,
  useRef,
  useState,
} from 'react';
import {ListKeysCache, ListMeasurerCache} from './caches';
import {ListChildComponentProps, ListOnItemsRenderedProps, ListOnScrollProps, VariableSizeList} from 'react-window';
import AutoSizer from 'react-virtualized-auto-sizer';
import InfiniteLoader from 'react-window-infinite-loader';
import VirtualizedListMeasurer from './VirtualizedListMeasurer';
import {RefUtils} from '../../../../shared/utils/RefUtils';
import VirtualizedListItem from './VirtualizedListItem';
import {useForceUpdate} from '../../../../shared/hooks/useForceUpdate';

export type VirtualizedListMethods = {
  clearCache: (index?: number) => void;
  scrollToPosition: (position: number) => void;
  scrollToTop: () => void;
  scrollToBottom: () => void;
  isScrolledToTop: boolean;
  isScrolledToBottom: boolean;
};

type OnItemsRendered = (props: ListOnItemsRenderedProps) => any;

type VirtualizedListProps<T> = {
  itemRenderer: (item: T) => ReactElement;
  itemData: T[];
  allLoaded?: boolean;
  loadMoreItems?: () => Promise<void>;
  itemHeight?: number;
  keyExtractor?: (index: number) => string;
  reverseOrder?: boolean;
  paddingTop?: number;
  paddingBottom?: number;
  setIsOnTop?: (isOnTop: boolean) => void;
  setIsOnBottom?: (isOnBottom: boolean) => void;
  setVisibleItems?: (visibleItems: number[]) => void;
  virtualizedListRef?: Ref<VirtualizedListMethods>;
};

const getItemStyles = (length: number, index: number, paddingTop: number, paddingBottom: number): CSSProperties => {
  let calculatedStyle: CSSProperties = {};
  if (index === 0) {
    calculatedStyle = {paddingTop};
  } else if (index === length) {
    calculatedStyle = {paddingBottom};
  }
  return calculatedStyle;
};

const VirtualizedList = (props: VirtualizedListProps<any>) => {
  const {itemRenderer, itemData, allLoaded = true, loadMoreItems} = props;
  const {itemHeight, keyExtractor, reverseOrder, virtualizedListRef} = props;
  const {paddingTop = 0, paddingBottom = 0, setIsOnTop, setIsOnBottom, setVisibleItems} = props;
  const forceUpdate = useForceUpdate();
  const [scroll, setScroll] = useState<ListOnScrollProps>();
  const [loading, setLoading] = useState<boolean>(false);
  const [keyCache] = useState<ListKeysCache>(new ListKeysCache());
  const [measurerCache] = useState<ListMeasurerCache>(new ListMeasurerCache());
  const listRef = useRef<VariableSizeList>();

  const isDynamic = useMemo<boolean>(() => {
    return itemHeight === undefined && keyExtractor !== undefined;
  }, []);

  const loadedLength = useMemo<number>(() => {
    return itemData.length;
  }, [itemData]);

  const height = isDynamic ? measurerCache.getTotalHeight() : itemHeight * loadedLength;
  const prevHeight = RefUtils.usePrevious(height);

  // OUTER METHODS

  const clearCache = useCallback((index?: number): void => {
    const key = keyCache.get(index);
    keyCache.clear(index);
    measurerCache.clear(key);
  }, []);

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
    return !clientHeight || height <= Math.ceil(scrollTop + clientHeight);
  }, [scroll, height]);

  const prevIsScrolledToBottom = RefUtils.usePrevious(isScrolledToBottom);

  useImperativeHandle(
    virtualizedListRef,
    (): VirtualizedListMethods => ({
      clearCache,
      scrollToPosition,
      scrollToTop,
      scrollToBottom,
      isScrolledToTop,
      isScrolledToBottom,
    }),
    [clearCache, scrollToPosition, scrollToTop, scrollToBottom, isScrolledToTop, isScrolledToBottom],
  );

  /*
  Render params
   */

  const itemCount = useMemo<number>(() => {
    return allLoaded ? loadedLength : loadedLength + 1;
  }, [allLoaded, loadedLength]);

  const isItemLoaded = useCallback(
    (index: number): boolean => {
      const isItemLoaded = reverseOrder ? index > 0 || allLoaded : index < loadedLength || allLoaded;
      return loading || isItemLoaded;
    },
    [loading, allLoaded, loadedLength],
  );

  const getItemSize = useCallback((index: number): number => {
    return isDynamic ? measurerCache.getHeight(keyCache.get(index)) : itemHeight;
  }, []);

  const wrappedOnItemsRendered = useCallback(
    (onItemsRendered: OnItemsRendered) => (props: ListOnItemsRenderedProps): void => {
      if (setVisibleItems) {
        const firstVisible = props.visibleStartIndex;
        const visibleItemsCount = props.visibleStopIndex - props.visibleStartIndex + 1;
        const visibleItems = Array.from({length: visibleItemsCount}, (_, i) => i + firstVisible);
        setVisibleItems(visibleItems);
      }
      onItemsRendered(props);
    },
    [],
  );

  const wrappedLoadMoreItems = useCallback((): Promise<void> => {
    return loadMoreItems
      ? new Promise((resolve) => {
          setLoading(true);
          loadMoreItems()
            .catch(() => setLoading(false))
            .finally(() => resolve());
        })
      : undefined;
  }, [loadMoreItems]);

  const styledItemRenderer = useCallback(
    (params: ListChildComponentProps) => {
      const {data, index, style} = params;
      const item = data[index];
      const itemStyle = getItemStyles(loadedLength, index, paddingTop, paddingBottom);
      return <div style={{...style, ...itemStyle}}>{itemRenderer(item)}</div>;
    },
    [itemRenderer, loadedLength, paddingTop, paddingBottom],
  );

  const measurableItemRenderer = useCallback(
    (params: ListChildComponentProps) => {
      const {data, index, style} = params;
      const item = data[index];
      const itemStyle = getItemStyles(loadedLength, index, paddingTop, paddingBottom);
      return (
        <div style={style}>
          <VirtualizedListItem {...{index, keyExtractor, forceUpdate, measurerCache, listRef}}>
            <div style={itemStyle}>{itemRenderer(item)}</div>
          </VirtualizedListItem>
        </div>
      );
    },
    [itemRenderer, keyExtractor, loadedLength, paddingTop, paddingBottom],
  );

  /*
  Effects
   */

  useEffect(() => {
    const clientHeight = listRef.current?.props.height as number;
    const canScrollToPosition = reverseOrder && height > clientHeight;
    const heightChanged = height !== prevHeight;
    if (heightChanged) {
      listRef.current?.resetAfterIndex(0, true);
      if (loading && canScrollToPosition) {
        const position = height - prevHeight + scroll?.scrollOffset;
        scrollToPosition(position);
      } else if (prevIsScrolledToBottom && canScrollToPosition) {
        scrollToBottom();
      }
    }
    if (loading) {
      setLoading(false);
    }
  }, [height]);

  useEffect(() => {
    setIsOnTop && setIsOnTop(isScrolledToTop);
  }, [isScrolledToTop]);

  useEffect(() => {
    setIsOnBottom && setIsOnBottom(isScrolledToBottom);
  }, [isScrolledToBottom]);

  /*
  Render
   */

  const measurer = (
    <VirtualizedListMeasurer
      itemRenderer={styledItemRenderer}
      itemData={itemData}
      keyExtractor={keyExtractor}
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
          <InfiniteLoader isItemLoaded={isItemLoaded} loadMoreItems={wrappedLoadMoreItems} itemCount={itemCount}>
            {({onItemsRendered, ref}): ReactElement => (
              <VariableSizeList
                height={height}
                width={width}
                itemData={itemData}
                itemCount={loadedLength}
                itemSize={getItemSize}
                onItemsRendered={wrappedOnItemsRendered(onItemsRendered)}
                onScroll={setScroll}
                ref={RefUtils.merge(listRef, ref)}
              >
                {isDynamic ? measurableItemRenderer : styledItemRenderer}
              </VariableSizeList>
            )}
          </InfiniteLoader>
        </>
      )}
    </AutoSizer>
  );
};

export default memo(VirtualizedList);
