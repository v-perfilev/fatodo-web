import React, {FC, ReactElement, Ref, useCallback, useImperativeHandle, useMemo, useRef, useState} from 'react';
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

const cellMeasurerCache = new CellMeasurerCache({
  defaultHeight: 0,
  fixedWidth: true
});

export type VirtualizedListMethods = {
  clearAndRecomputeCache: () => void;
  scrollToPosition: (position: number) => void;
  scrollToBottom: () => void;
  isScrolledToBottom: boolean;
};

export const VirtualizedList: FC<Props> = (props: Props) => {
  const {renderer, loadedLength, totalLength, loadMoreRows, isRowLoaded} = props;
  const {rowHeight, reverseOrder, virtualizedListRef} = props;
  const [scrollParams, setScrollParams] = useState<ScrollParams>();
  const listRef = useRef<List>();

  const calculateTotalHeight = useCallback((): number => {
    return Array.from(Array(loadedLength).keys())
      .map((index) => cellMeasurerCache.getHeight(index, 0))
      .reduce((acc, height) => acc + height, 0);
  }, [totalLength]);

  const clearAndRecomputeCache = useCallback((): void => {
    cellMeasurerCache.clearAll();
    listRef.current.recomputeRowHeights();
  }, [listRef.current]);

  const scrollToPosition = useCallback((position: number): void => {
    listRef.current.scrollToPosition(position);
  }, [listRef.current]);

  const scrollToBottom = useCallback((): void => {
    listRef.current.scrollToRow(totalLength - 1);
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
      clearAndRecomputeCache,
      scrollToPosition,
      scrollToBottom,
      isScrolledToBottom
    }),
    [scrollToPosition, scrollToBottom, isScrolledToBottom]
  );

  const getHeightFromCache = useCallback(({index}: Index): number => {
    return cellMeasurerCache.getHeight(index, 0);
  }, []);

  const rendererWithMeasurer = useCallback((props: ListRowProps): ReactElement => (
    <CellMeasurer cache={cellMeasurerCache} columnIndex={0} rowIndex={props.index} {...props}>
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
      deferredMeasurementCache={rowHeight ? undefined : cellMeasurerCache}
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
        isRowLoaded={isRowLoaded}
        loadMoreRows={loadMoreRows}
        rowCount={totalLength}
      >
        {listAutoSizer}
      </InfiniteLoader>
    </>
  );

};
