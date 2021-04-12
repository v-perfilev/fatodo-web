import React, {FC, ReactElement, Ref, useImperativeHandle} from 'react';
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
import {RenderedSection} from 'react-virtualized/dist/es/Grid';

type Props = {
  renderer: (params: ListRowProps) => ReactElement;
  loadedLength: number;
  totalLength: number;
  isRowLoaded: (params: Index) => boolean;
  loadMoreRows: (params: IndexRange) => Promise<void>;
  rowHeight?: number;
  onScroll?: (params: ScrollParams) => void;
  onSectionRendered?: (params: RenderedSection) => void;
  scrollToIndex?: number;
  virtualizedCacheRef?: Ref<VirtualizedCache>;
};

const cellMeasurerCache = new CellMeasurerCache({
  defaultHeight: 50,
  fixedWidth: true,
});

export type VirtualizedCache = {
  clearCache: () => void;
};

export const VirtualizedList: FC<Props> = (props: Props) => {
  const {renderer, loadedLength, totalLength, isRowLoaded, loadMoreRows} = props;
  const {rowHeight, onScroll, onSectionRendered, scrollToIndex, virtualizedCacheRef} = props;

  useImperativeHandle(
    virtualizedCacheRef,
    (): VirtualizedCache => ({
      clearCache(): void {
        cellMeasurerCache.clearAll();
      },
    })
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
      onSectionRendered={onSectionRendered}
      onRowsRendered={onRowsRendered}
      ref={registerChild}
      deferredMeasurementCache={rowHeight ? undefined : cellMeasurerCache}
      rowCount={loadedLength}
      rowHeight={rowHeight || cellMeasurerCache.rowHeight}
      scrollToIndex={scrollToIndex}
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
