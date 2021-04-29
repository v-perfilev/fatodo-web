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
import {ListKeysCache, ListMeasurerCache, ListParamsCache} from './_caches';
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
  const [scroll, setScroll] = useState<ListOnScrollProps>();
  const [loading, setLoading] = useState<boolean>(false);

  const [paramsCache] = useState<ListParamsCache>(new ListParamsCache());
  const [keyCache] = useState<ListKeysCache>(new ListKeysCache());
  const [measurerCache] = useState<ListMeasurerCache>(new ListMeasurerCache());

  const listRef = useRef<VariableSizeList>();

  // OUTER METHODS

  const calculateTotalHeight = useCallback((): number => {
    return Array.from(Array(loadedLength).keys())
      .map((index) => keyCache.get(index))
      .map((key) => measurerCache.getHeight(key))
      .reduce((acc, height) => acc + height, 0);
  }, [keyCache, measurerCache, loadedLength]);

  const clearCache = useCallback((): void => {
    measurerCache.clear();
  }, [measurerCache]);

  const updateList = useCallback((): void => {
    listRef.current?.resetAfterIndex(0, true);
  }, [listRef.current]);

  const scrollToPosition = useCallback(
    (position: number): void => {
      listRef.current?.scrollTo(position);
    },
    [listRef.current]
  );

  const scrollToBottom = useCallback((): void => {
    listRef.current?.scrollToItem(totalLength - 1);
  }, [listRef.current]);

  const isScrolledToBottom = useMemo<boolean>(() => {
    const clientHeight = listRef.current?.props.height as number;
    const scrollTop = scroll?.scrollOffset;
    const scrollHeight = calculateTotalHeight();
    return !clientHeight || scrollHeight <= scrollTop + clientHeight;
  }, [listRef.current, scroll, totalLength]);

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

  const height = calculateTotalHeight();

  const logCache = (): void => {
    const heights = Array.from(Array(loadedLength).keys())
      .map((index) => keyCache.get(index))
      .map((key) => measurerCache.getHeight(key))
      .reduce((acc, height) => [...acc, height], []);
    console.log(heights);
  };

  useEffect(() => {
    if (reverseOrder && height > 0 && paramsCache.getPreviousHeight() === 0) {
      scrollToPosition(height);
    } else if (reverseOrder && loading && height > paramsCache.getPreviousHeight()) {
      const position = height - paramsCache.getPreviousHeight() + scroll?.scrollOffset;
      scrollToPosition(position);
      setLoading(false);
    }
    listRef.current?.resetAfterIndex(0, true);
    paramsCache.updatePreviousHeight(height);
  }, [height]);

  // RENDER PARAMS

  const updateKeys = (): void => {
    if (!itemHeight && itemKey) {
      for (let i = 0; i < loadedLength; i++) {
        const key = itemKey(i);
        keyCache.set(i, key);
      }
    }
  };

  const wrappedIsItemLoaded = (index: number): boolean => {
    return loading || isItemLoaded(index);
  };

  const wrappedLoadMoreRows = (): Promise<void> =>
    new Promise((resolve) => {
      setLoading(true);
      loadMoreItems()
        .catch(() => setLoading(false))
        .finally(() => resolve());
    });

  const getItemSize = (index: number): number => {
    return itemHeight || measurerCache.getHeight(keyCache.get(index));
  };

  // RENDER METHODS

  updateKeys();

  return (
    <AutoSizer>
      {({height, width}): ReactElement => (
        <>
          <VirtualizedListMeasurer
            measurerCache={measurerCache}
            keyCache={keyCache}
            renderer={itemRenderer}
            loadedLength={loadedLength}
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
                {itemRenderer}
              </VariableSizeList>
            )}
          </InfiniteLoader>
        </>
      )}
    </AutoSizer>
  );
};
