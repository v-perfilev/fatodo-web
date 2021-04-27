import React, {FC, ReactElement, Ref, useCallback, useImperativeHandle, useMemo, useRef, useState} from 'react';
import {
  AutoSizer,
  CellMeasurer,
  CellMeasurerCache,
  Index,
  IndexRange,
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
  loadMoreRows: (params: IndexRange) => Promise<void>;
  isRowLoaded: (params: Index) => boolean;
  rowHeight?: number;
  reverseOrder?: boolean;
  virtualizedListRef?: Ref<VirtualizedListMethods>;
};

const cellMeasurerCache = new CellMeasurerCache({
  fixedWidth: true
});

export type VirtualizedListMethods = {
  clearCache: (index?: number) => void;
  scrollToPosition: (position: number) => void;
  scrollToBottom: () => void;
  isScrolledToBottom: boolean;
};

export const VirtualizedList: FC<Props> = (props: Props) => {
  const {renderer, loadedLength, totalLength, loadMoreRows, isRowLoaded} = props;
  const {rowHeight, reverseOrder, virtualizedListRef} = props;
  const [scrollParams, setScrollParams] = useState<ScrollParams>();
  const listRef = useRef<List>();

  const clearCache = useCallback((index?: number): void => {
    if (index !== undefined) {
      cellMeasurerCache.clear(index, 0);
    } else {
      cellMeasurerCache.clearAll();
    }
  }, []);

  const scrollToPosition = useCallback((position: number) => {
    listRef.current.scrollToPosition(position);
  }, [listRef.current]);

  const scrollToBottom = useCallback(() => {
    listRef.current.scrollToRow(loadedLength - 1);
  }, [listRef.current, loadedLength]);

  const isScrolledToBottom = useMemo<boolean>(() => {
    const clientHeight = scrollParams?.clientHeight;
    const scrollTop = scrollParams?.scrollTop;
    const scrollHeight = Array.from(Array(loadedLength).keys())
      .reduce((acc, index) => acc + cellMeasurerCache.getHeight(index, 0), 0);
    return !clientHeight || scrollHeight <= scrollTop + clientHeight;
  }, [scrollParams]);

  useImperativeHandle(
    virtualizedListRef,
    (): VirtualizedListMethods => ({
      clearCache,
      scrollToPosition,
      scrollToBottom,
      isScrolledToBottom
    }),
    [scrollToPosition, scrollToBottom, isScrolledToBottom]
  );

  const getHeightFromCache = ({index}: Index): number => {
    return cellMeasurerCache.getHeight(index, 0);
  };

  const rendererWithMeasurer = (props: ListRowProps): ReactElement => (
    <CellMeasurer cache={cellMeasurerCache} columnIndex={0} rowIndex={props.index} {...props}>
      {renderer(props)}
    </CellMeasurer>
  );

  const getRenderer = (): ListRowRenderer => {
    return rowHeight ? renderer : rendererWithMeasurer;
  };

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
