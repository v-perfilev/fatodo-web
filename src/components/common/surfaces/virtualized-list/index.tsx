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
import {
  AutoSizer,
  CellMeasurer,
  CellMeasurerCache,
  Index,
  InfiniteLoader,
  InfiniteLoaderChildProps,
  List,
  ListRowProps,
  ScrollParams,
  Size
} from 'react-virtualized';
import {RefUtils} from '../../../../shared/utils/ref.utils';
import {ListRowRenderer} from 'react-virtualized/dist/es/List';
import {ListParamsCache} from './_caches';

type Props = {
  renderer: (params: ListRowProps) => ReactElement;
  loadedLength: number;
  totalLength: number;
  loadMoreRows: () => Promise<void>;
  isRowLoaded: (params: Index) => boolean;
  rowHeight?: number;
  reverseOrder?: boolean;
  virtualizedListRef?: Ref<VirtualizedListMethods>;
};

export type VirtualizedListMethods = {
  clearCache: () => void;
  shiftCache: (length: number, shift: number) => void;
  recomputeCache: () => void;
  scrollToPosition: (position: number) => void;
  scrollToBottom: () => void;
  isScrolledToBottom: boolean;
};

export const VirtualizedList: FC<Props> = (props: Props) => {
  const {renderer, loadedLength, totalLength, loadMoreRows, isRowLoaded} = props;
  const {rowHeight, reverseOrder, virtualizedListRef} = props;
  const [scrollParams, setScrollParams] = useState<ScrollParams>();
  const [updating, setUpdating] = useState<boolean>(false);

  const paramsCache = useRef<ListParamsCache>(new ListParamsCache());
  const measurerCache = useRef<CellMeasurerCache>(new CellMeasurerCache({fixedWidth: true}));
  const listRef = useRef<List>();

  // OUTER METHODS

  const calculateTotalHeight = useCallback((): number => {
    return Array.from(Array(loadedLength).keys())
      .map((index) => measurerCache.current.getHeight(index, 0))
      .reduce((acc, height) => acc + height, 0);
  }, [measurerCache.current, loadedLength]);

  const clearCache = useCallback((): void => {
    measurerCache.current.clearAll();
  }, [measurerCache.current]);

  const shiftCache = useCallback((length: number, shift: number): void => {
    for (let i = length - 1; i >= 0; i--) {
      const height = measurerCache.current.getHeight(i, 0);
      measurerCache.current.set(i + shift, 0, 0, height);
    }
    for (let i = 0; i < shift + 1; i++) {
      measurerCache.current.clear(i, 0);
    }
  }, [measurerCache.current]);

  const recomputeCache = useCallback((): void => {
    listRef.current?.recomputeRowHeights();
  }, [listRef.current]);

  const scrollToPosition = useCallback((position: number): void => {
    listRef.current?.scrollToPosition(position);
  }, [listRef.current]);

  const scrollToBottom = useCallback((): void => {
    listRef.current?.scrollToRow(totalLength - 1);
  }, [listRef.current]);

  const isScrolledToBottom = useMemo<boolean>(() => {
    const clientHeight = scrollParams?.clientHeight;
    const scrollTop = scrollParams?.scrollTop;
    const scrollHeight = calculateTotalHeight();
    return !clientHeight || scrollHeight <= scrollTop + clientHeight;
  }, [scrollParams, totalLength]);

  useImperativeHandle(
    virtualizedListRef,
    (): VirtualizedListMethods => ({
      clearCache,
      shiftCache,
      recomputeCache,
      scrollToPosition,
      scrollToBottom,
      isScrolledToBottom
    }),
    [clearCache, shiftCache, recomputeCache, scrollToPosition, scrollToBottom, isScrolledToBottom]
  );

  // MAIN COMPONENT CONTENT

  const height = calculateTotalHeight();

  const logCache = () => {
    const heights = Array.from(Array(loadedLength).keys())
      .map((i) => measurerCache.current.getHeight(i, 0))
      .reduce((acc, height) => [...acc, height], []);
    console.log(heights);
  };

  useEffect(() => {
    if (updating && loadedLength > paramsCache.current.previousLength) {
      shiftCache(paramsCache.current.previousLength, loadedLength - paramsCache.current.previousLength);
      recomputeCache();
    }
    paramsCache.current.updateLength(loadedLength);
  }, [loadedLength]);

  useEffect(() => {
    if (updating && height > paramsCache.current.previousHeight) {
      const position = height - paramsCache.current.previousHeight + scrollParams?.scrollTop;
      scrollToPosition(position);
      setUpdating(false);
    }
    paramsCache.current.updateHeight(height);
  }, [height]);

  // RENDER PARAMS

  const isLoaded = useCallback((params: Index): boolean => {
    return updating || isRowLoaded(params);
  }, [updating, isRowLoaded]);

  const wrappedLoadMoreRows = (): Promise<void> => new Promise((resolve) => {
    setUpdating(true);
    loadMoreRows()
      .catch(() => setUpdating(false))
      .finally(() => resolve());
  });

  // RENDER METHODS

  const getHeightFromCache = useCallback(({index}: Index): number => {
    return measurerCache.current.getHeight(index, 0);
  }, []);

  const rendererWithMeasurer = useCallback((props: ListRowProps): ReactElement => (
    <CellMeasurer cache={measurerCache.current} columnIndex={0} rowIndex={props.index} {...props}>
      {renderer(props)}
    </CellMeasurer>
  ), [renderer]);

  const getRenderer = useCallback((): ListRowRenderer => {
    return rowHeight ? renderer : rendererWithMeasurer;
  }, [rowHeight, renderer, rendererWithMeasurer]);

  const listRenderer = (loaderProps: InfiniteLoaderChildProps) => (size: Size): ReactElement => (
    <List
      ref={RefUtils.mergeRefs(loaderProps.registerChild, listRef)}
      width={size.width}
      height={size.height}
      onScroll={setScrollParams}
      scrollToIndex={reverseOrder && isScrolledToBottom ? loadedLength - 1 : undefined}
      onRowsRendered={loaderProps.onRowsRendered}
      rowCount={loadedLength}
      deferredMeasurementCache={rowHeight ? undefined : measurerCache.current}
      rowHeight={rowHeight || getHeightFromCache}
      rowRenderer={getRenderer()}
    />
  );

  const listAutoSizer = (infiniteLoaderChildProps: InfiniteLoaderChildProps): ReactElement => (
    <AutoSizer>{listRenderer(infiniteLoaderChildProps)}</AutoSizer>
  );

  return (
    <>
      <InfiniteLoader
        isRowLoaded={isLoaded}
        loadMoreRows={wrappedLoadMoreRows}
        rowCount={totalLength}
      >
        {listAutoSizer}
      </InfiniteLoader>
    </>
  );

};
