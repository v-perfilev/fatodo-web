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
import {ListChildComponentProps, ListOnScrollProps, VariableSizeList} from 'react-window';
import AutoSizer from 'react-virtualized-auto-sizer';
import InfiniteLoader from 'react-window-infinite-loader';
import VirtualizedListMeasurer from './virtualized-list-measurer';
import {RefUtils} from '../../../../shared/utils/ref.utils';

type Props = {
  itemRenderer: (params: ListChildComponentProps) => ReactElement;
  loadMoreItems: () => Promise<void>;
  isItemLoaded: (index: number) => boolean;
  loadedLength: number;
  totalLength: number;
  itemHeight?: number;
  itemKey?: (index: number) => string;
  reverseOrder?: boolean;
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
  const {itemRenderer, loadMoreItems, isItemLoaded, loadedLength, totalLength} = props;
  const {itemHeight, itemKey, reverseOrder, virtualizedListRef} = props;
  const listRef = useRef<VariableSizeList>();
  const [scroll, setScroll] = useState<ListOnScrollProps>();
  const [loading, setLoading] = useState<boolean>(false);
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

  const scrollToPosition = useCallback(
    (position: number): void => {
      listRef.current?.scrollTo(position);
    }, []);

  const scrollToBottom = useCallback((): void => {
    listRef.current?.scrollToItem(totalLength - 1);
  }, []);

  const isScrolledToBottom = useMemo<boolean>(() => {
    const clientHeight = listRef.current?.props.height as number;
    const scrollTop = scroll?.scrollOffset;
    const scrollHeight = measurerCache.totalHeight();
    return !clientHeight || scrollHeight <= scrollTop + clientHeight;
  }, [scroll, totalLength]);

  useImperativeHandle(
    virtualizedListRef,
    (): VirtualizedListMethods => ({
      clearCache,
      updateList,
      scrollToPosition,
      scrollToBottom,
      isScrolledToBottom
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

  const wrappedItemRenderer = useCallback((params: ListChildComponentProps): ReactElement => {
    const style = {...params.style, overflow: 'hidden'};
    return itemRenderer({...params, style});
  }, [itemRenderer]);

  const wrappedIsItemLoaded = useCallback((index: number): boolean => {
    return loading || isItemLoaded(index);
  }, [loading, isItemLoaded]);

  const wrappedLoadMoreRows = useCallback((): Promise<void> => {
    return new Promise((resolve) => {
      setLoading(true);
      loadMoreItems()
        .catch(() => setLoading(false))
        .finally(() => resolve());
    });
  }, [loadMoreItems]);

  const getItemSize = useCallback((index: number): number => {
    return itemHeight || measurerCache.getHeight(keyCache.get(index));
  }, [itemHeight]);

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
            afterMeasure={forceUpdate}
          />
          <InfiniteLoader
            isItemLoaded={wrappedIsItemLoaded}
            loadMoreItems={wrappedLoadMoreRows}
            itemCount={totalLength}
          >
            {({onItemsRendered, ref}): ReactElement => (
              <VariableSizeList
                ref={RefUtils.mergeRefs(listRef, ref)}
                height={height}
                width={width}
                itemCount={loadedLength}
                itemSize={getItemSize}
                onItemsRendered={onItemsRendered}
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
