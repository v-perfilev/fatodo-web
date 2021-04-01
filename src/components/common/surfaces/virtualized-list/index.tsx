import React, {FC, ReactElement} from 'react';
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
import {RenderedSection} from 'react-virtualized/dist/es/Grid';

type Props = {
  renderer: (params: ListRowProps) => ReactElement,
  loadedLength: number,
  totalLength: number,
  isRowLoaded: (params: Index) => boolean,
  loadMoreRows: (params: IndexRange) => Promise<void>,
  onScroll?: (params: ScrollParams) => void,
  onSectionRendered?: (params: RenderedSection) => void,
  scrollToIndex?: number
};

const cellMeasurerCache = new CellMeasurerCache({
  defaultHeight: 100,
  fixedWidth: true
});

export const VirtualizedList: FC<Props> = (props: Props) => {
  const {renderer, loadedLength, totalLength, isRowLoaded, loadMoreRows} = props;
  const {onScroll, onSectionRendered, scrollToIndex} = props;

  const listLoader = (): ReactElement => (
    <InfiniteLoader
      isRowLoaded={isRowLoaded}
      loadMoreRows={loadMoreRows}
      rowCount={totalLength}
    >
      {listAutoSizer}
    </InfiniteLoader>
  );

  const listAutoSizer = (infiniteLoaderChildProps: InfiniteLoaderChildProps): ReactElement => (
    <AutoSizer>{listRenderer(infiniteLoaderChildProps)}</AutoSizer>
  );

  const listRenderer = ({onRowsRendered, registerChild}: InfiniteLoaderChildProps) =>
    ({height, width}: Size): ReactElement => (
      <List
        height={height}
        width={width}
        onScroll={onScroll}
        onSectionRendered={onSectionRendered}
        onRowsRendered={onRowsRendered}
        ref={registerChild}
        deferredMeasurementCache={cellMeasurerCache}
        rowCount={loadedLength}
        rowHeight={cellMeasurerCache.rowHeight}
        scrollToIndex={scrollToIndex}
        rowRenderer={rowRenderer}
      />
    );

  const rowRenderer = (props: ListRowProps): ReactElement => (
    <CellMeasurer cache={cellMeasurerCache} columnIndex={0} rowIndex={props.index} {...props}>
      {renderer(props)}
    </CellMeasurer>
  );

  return listLoader();

};
