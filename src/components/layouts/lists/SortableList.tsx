import React, {ReactElement, useEffect, useMemo, useRef, useState} from 'react';
import AutoSizer from 'react-virtualized-auto-sizer';
import {animated, UseSpringProps, useSprings} from 'react-spring';
import {useDrag} from 'react-use-gesture';
import {ArrayUtils} from '../../../shared/utils/ArrayUtils';
import {useResize} from '../../../shared/hooks/useResize';

type SortableListProps<T> = {
  itemRenderer: (item: T, drag?: any) => ReactElement;
  data: T[];
  dataCount: number;
  setOrder: (order: number[]) => void;
  paddingTop?: number;
  paddingBottom?: number;
};

type StyleArgs = {
  indexOrder: any;
  down?: boolean;
  originalIndex?: number;
  currentIndex?: number;
  x?: number;
  y?: number;
  immediate?: boolean;
};

type SortingSize = {
  container: {width: number; height: number};
  item: {width: number; height: number};
};

type GridParams = {
  rowCount: number;
  colCount: number;
};

const defaultSortingSize: Readonly<SortingSize> = {
  container: {width: 1, height: 1},
  item: {width: 1, height: 1},
};

const calculateSprings = (args: StyleArgs, size: SortingSize, grid: GridParams) => (index: number): UseSpringProps => {
  const {indexOrder, down, originalIndex, currentIndex, x, y, immediate} = args;
  const calculateX = (index): number => (index % grid.colCount) * size.item.width;
  const calculateY = (index): number => Math.floor(index / grid.colCount) * size.item.height;
  if (down && index === originalIndex) {
    const xOffset = calculateX(currentIndex) + x;
    const yOffset = calculateY(currentIndex) + y;
    return {transform: `translate3d(${xOffset}px,${yOffset}px,0)`, zIndex: 10000, immediate: true};
  } else {
    const xOffset = calculateX(indexOrder.indexOf(index));
    const yOffset = calculateY(indexOrder.indexOf(index));
    return {transform: `translate3d(${xOffset}px,${yOffset}px,0)`, zIndex: 0, immediate: immediate};
  }
};

const calculateNewIndex = (count: number, index: number, x, y, size: SortingSize, grid: GridParams): number => {
  const currentCol = index % grid.colCount;
  const currentRow = Math.floor(index / grid.colCount);
  const calcCol = Math.round((currentCol * size.item.width + x) / size.item.width);
  const calcRow = Math.round((currentRow * size.item.height + y) / size.item.height);
  const newCol = ArrayUtils.clamp(calcCol, 0, grid.colCount - 1);
  const newRow = ArrayUtils.clamp(calcRow, 0, grid.rowCount - 1);
  return ArrayUtils.clamp(newCol + newRow * grid.colCount, 0, count - 1);
};

const SortableList = (props: SortableListProps<any>) => {
  const {itemRenderer, data, dataCount, setOrder, paddingTop = 0, paddingBottom = 0} = props;
  const resize = useResize();
  const [size, setSize] = useState<SortingSize>(defaultSortingSize);
  const order = useRef<number[]>(data.map((_, i) => i));
  const containerRef = useRef<HTMLDivElement>();
  const itemRef = useRef<HTMLDivElement>();

  const grid = useMemo<GridParams>(() => {
    const colCount = Math.round(size.container.width / size.item.width);
    const rowCount = Math.ceil(data.length / colCount);
    return {colCount, rowCount};
  }, [size]);

  const [springs, setSprings] = useSprings(dataCount, calculateSprings({indexOrder: order.current}, size, grid));

  const drag = useDrag(({args: [originalIndex], down, movement: [x, y]}) => {
    const currentIndex = order.current.indexOf(originalIndex);
    const newIndex = calculateNewIndex(dataCount, currentIndex, x, y, size, grid);
    const newOrder = ArrayUtils.move(order.current, currentIndex, newIndex);
    const newSprings = calculateSprings({indexOrder: newOrder, down, originalIndex, currentIndex, x, y}, size, grid);
    setSprings(newSprings);
    if (!down) {
      order.current = newOrder;
      setOrder(newOrder);
    }
  });

  useEffect(() => {
    if (containerRef.current && itemRef.current) {
      const container = {width: containerRef.current.clientWidth, height: containerRef.current.clientHeight};
      const item = {width: itemRef.current.clientWidth, height: itemRef.current.clientHeight};
      setSize({container, item});
    }
  }, [containerRef.current, itemRef.current, resize]);

  useEffect(() => {
    const newOrder = data.map((_, index) => index);
    order.current = newOrder;
    setOrder(newOrder);
    setSprings(calculateSprings({indexOrder: order.current, immediate: true}, size, grid));
  }, [size, data]);

  return (
    <AutoSizer>
      {({width, height}): ReactElement => (
        <div style={{width, height, paddingTop, paddingBottom, overflowY: 'scroll'}} ref={containerRef}>
          <div style={{position: 'relative'}}>
            {Array.from({length: dataCount}).map((_, index) => (
              <animated.div ref={itemRef} style={{position: 'absolute', width: '100%', ...springs[index]}} key={index}>
                {itemRenderer(data[index], drag(index))}
              </animated.div>
            ))}
          </div>
        </div>
      )}
    </AutoSizer>
  );
};

export default SortableList;
