import React, {
  CSSProperties,
  FC,
  ReactElement,
  Ref,
  useCallback,
  useEffect,
  useImperativeHandle,
  useMemo,
  useRef,
  useState,
} from 'react';
import {ListKeysCache, ListMeasurerCache} from './_caches';
import {ListChildComponentProps, ListOnItemsRenderedProps, ListOnScrollProps, VariableSizeList} from 'react-window';
import AutoSizer from 'react-virtualized-auto-sizer';
import InfiniteLoader from 'react-window-infinite-loader';
import VirtualizedListMeasurer from './virtualized-list-measurer';
import {RefUtils} from '../../../../shared/utils/ref.utils';
import {ListItemProps, OnItemsRendered} from './types';

type Props = {
  itemRenderer: (params: ListItemProps) => ReactElement;
  loadMoreItems: () => Promise<void>;
  loadedLength: number;
  allLoaded: boolean;
  itemHeight?: number;
  itemKey?: (index: number) => string;
  reverseOrder?: boolean;
  firstItemStyle?: CSSProperties;
  virtualizedListRef?: Ref<VirtualizedListMethods>;
};

export type VirtualizedListMethods = {
  clearCache: () => void;
  updateList: () => void;
  scrollToPosition: (position: number) => void;
  scrollToBottom: () => void;
  isScrolledToBottom: boolean;
};

export const VirtualizedList: FC<Props> = (props: Props) => {
  const {itemRenderer, loadMoreItems, loadedLength, allLoaded} = props;
  const {itemHeight, itemKey, reverseOrder, firstItemStyle, virtualizedListRef} = props;
  const listRef = useRef<VariableSizeList>();
  const [scroll, setScroll] = useState<ListOnScrollProps>();
  const [loading, setLoading] = useState<boolean>(false);
  const [visible, setVisible] = useState<number[]>([]);
  const [keyCache] = useState<ListKeysCache>(new ListKeysCache());
  const [measurerCache] = useState<ListMeasurerCache>(new ListMeasurerCache());
  const [, updateState] = useState<{}>();

  const forceUpdate = useCallback(() => {
    updateState({});
  }, []);

  // OUTER METHODS

  const clearCache = useCallback((): void => {
    measurerCache.clear();
  }, []);

  const updateList = useCallback((): void => {
    listRef.current?.resetAfterIndex(0, true);
  }, []);

  const scrollToPosition = useCallback((position: number): void => {
    listRef.current?.scrollTo(position);
  }, []);

  const scrollToBottom = useCallback((): void => {
    listRef.current?.scrollToItem(loadedLength - 1);
  }, [loadedLength]);

  const isScrolledToBottom = useMemo<boolean>(() => {
    const clientHeight = listRef.current?.props.height as number;
    const scrollTop = scroll?.scrollOffset;
    const scrollHeight = measurerCache.totalHeight();
    return !clientHeight || scrollHeight <= scrollTop + clientHeight;
  }, [scroll, loadedLength]);

  useImperativeHandle(
    virtualizedListRef,
    (): VirtualizedListMethods => ({
      clearCache,
      updateList,
      scrollToPosition,
      scrollToBottom,
      isScrolledToBottom,
    }),
    [clearCache, updateList, scrollToPosition, scrollToBottom, isScrolledToBottom]
  );

  // MAIN COMPONENT CONTENT

  const height = measurerCache.totalHeight();
  const prevHeight = RefUtils.usePrevious(height);

  const updateKeys = useCallback((): void => {
    if (!itemHeight && itemKey) {
      for (let i = 0; i < loadedLength; i++) {
        const key = itemKey(i);
        keyCache.set(i, key);
      }
      forceUpdate();
    }
  }, [forceUpdate, itemHeight, itemKey]);

  const scrollAndRefresh = useCallback((): void => {
    if (height > prevHeight && reverseOrder && loading) {
      const position = height - prevHeight + scroll?.scrollOffset;
      scrollToPosition(position);
      setLoading(false);
    } else if (height > 0 && prevHeight === 0 && reverseOrder) {
      scrollToPosition(height);
    }
    listRef.current?.resetAfterIndex(0, true);
  }, [height, prevHeight, reverseOrder, loading, scrollToPosition]);

  useEffect(() => {
    updateKeys();
  }, [loadedLength]);

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
    (params: ListChildComponentProps): ReactElement => {
      const index = params.index;
      const style = {...params.style, overflow: 'hidden', ...(index === 0 ? firstItemStyle : null)};
      const isVisible = visible.includes(index);
      return itemRenderer({...params, style, isVisible});
    },
    [itemRenderer]
  );

  const wrappedOnItemsRendered = useCallback(
    (onItemsRendered: OnItemsRendered) => (props: ListOnItemsRenderedProps): void => {
      const firstVisible = props.visibleStartIndex;
      const visibleItemsCount = props.visibleStopIndex - props.visibleStartIndex + 1;
      const visibleItems = Array.from({length: visibleItemsCount}, (_, i) => i + firstVisible);
      setVisible(visibleItems);
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

  // RENDER METHODS

  return (
    <AutoSizer>
      {({height, width}): ReactElement => (
        <>
          <VirtualizedListMeasurer
            itemRenderer={itemRenderer}
            loadedItems={keyCache.size()}
            measurerCache={measurerCache}
            keyCache={keyCache}
            afterMeasured={forceUpdate}
          />
          <InfiniteLoader isItemLoaded={wrappedIsItemLoaded} loadMoreItems={wrappedLoadMoreRows} itemCount={itemCount}>
            {({onItemsRendered, ref}): ReactElement => (
              <VariableSizeList
                ref={RefUtils.mergeRefs(listRef, ref)}
                height={height}
                width={width}
                itemCount={loadedLength}
                itemSize={getItemSize}
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
