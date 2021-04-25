import React, {FC, ReactElement, Ref, useImperativeHandle, useRef} from 'react';
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
  Size,
} from 'react-virtualized';
import {RefUtils} from '../../../../shared/utils/ref.utils';

type Props = {
  renderer: (params: ListRowProps) => ReactElement;
  loadedLength: number;
  totalLength: number;
  isRowLoaded: (params: Index) => boolean;
  loadMoreRows: (params: IndexRange) => Promise<void>;
  rowHeight?: number;
  onScroll?: (params: ScrollParams) => void;
  scrollToIndex?: number;
  virtualizedListRef?: Ref<VirtualizedListMethods>;
};

const cellMeasurerCache = new CellMeasurerCache({
  fixedWidth: true,
});

export type VirtualizedListMethods = {
  clearCache: () => void;
  recomputeRowHeights: () => void;
  scrollToPosition: (position: number) => void;
  scrollToIndex: (index: number) => void;
};

export const VirtualizedList: FC<Props> = (props: Props) => {
  const {renderer, loadedLength, totalLength, isRowLoaded, loadMoreRows} = props;
  const {rowHeight, onScroll, scrollToIndex, virtualizedListRef} = props;
  const listRef = useRef<List>();

  useImperativeHandle(
    virtualizedListRef,
    (): VirtualizedListMethods => ({
      clearCache(): void {
        cellMeasurerCache.clearAll();
      },
      recomputeRowHeights(): void {
        if (listRef.current) {
          listRef.current.recomputeRowHeights();
        }
      },
      scrollToPosition(position: number): void {
        if (listRef.current) {
          listRef.current.scrollToPosition(position);
        }
      },
      scrollToIndex(index: number): void {
        if (listRef.current) {
          listRef.current.scrollToRow(index);
        }
      },
    }),
    [listRef.current]
  );

  const rowRendererWithMeasurer = (props: ListRowProps): ReactElement => (
    <CellMeasurer cache={cellMeasurerCache} columnIndex={0} rowIndex={props.index} {...props}>
      {renderer(props)}
    </CellMeasurer>
  );

  const rowRenderer = (props: ListRowProps): ReactElement => renderer(props);

  const listRenderer = ({onRowsRendered, registerChild}: InfiniteLoaderChildProps) => ({
    width,
    height,
  }: Size): ReactElement => (
    <List
      width={width}
      height={height}
      onScroll={onScroll}
      scrollToIndex={scrollToIndex}
      onRowsRendered={onRowsRendered}
      ref={RefUtils.mergeRefs(registerChild, listRef)}
      deferredMeasurementCache={rowHeight ? undefined : cellMeasurerCache}
      rowCount={loadedLength}
      rowHeight={rowHeight || cellMeasurerCache.rowHeight}
      rowRenderer={rowHeight ? rowRenderer : rowRendererWithMeasurer}
    />
  );

  const listAutoSizer = (infiniteLoaderChildProps: InfiniteLoaderChildProps): ReactElement => (
    <AutoSizer>{listRenderer(infiniteLoaderChildProps)}</AutoSizer>
  );

  const listLoader = (): ReactElement => (
    <InfiniteLoader isRowLoaded={isRowLoaded} loadMoreRows={loadMoreRows} rowCount={totalLength}>
      {listAutoSizer}
    </InfiniteLoader>
  );

  return listLoader();
};
