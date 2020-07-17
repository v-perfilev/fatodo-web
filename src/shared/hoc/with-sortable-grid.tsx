import * as React from 'react';
import {
  ComponentType,
  CSSProperties,
  FC,
  MutableRefObject,
  ReactElement,
  RefObject,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import {UseSpringProps, useSprings} from 'react-spring';
import {useDrag} from 'react-use-gesture';
import {clamp} from 'lodash-es';
import move from 'lodash-move';
import {useResize} from '../hooks/use-resize';

type SortingSize = {
  width: number;
  height: number;
};

const defaultSize: Readonly<SortingSize> = {
  width: 1,
  height: 1,
};

type SortingSizes = {
  container: SortingSize;
  item: SortingSize;
};

const defaultSortingSizes: Readonly<SortingSizes> = {
  container: defaultSize,
  item: defaultSize,
};

interface StyleArgs {
  indexOrder: any;
  down?: boolean;
  originalIndex?: number;
  currentIndex?: number;
  x?: number;
  y?: number;
  immediate?: boolean;
}

export type SortingProps = {
  sortingRef: RefObject<any>;
  setSortingItems: (items: any[]) => void;
  sortingOrder: MutableRefObject<number[]>;
  sortingSprings: CSSProperties[];
  sortingBind: (...any) => void;
  sortingHeight: number;
};

const withSortableGrid = (Component: ComponentType<SortingProps>): FC => (props): ReactElement => {
  const order = useRef(null);
  const ref = useRef(null);
  const [items, setItems] = useState([]);
  const [sizes, setSizes] = useState<SortingSizes>(defaultSortingSizes);
  const [height, setHeight] = useState(0);
  const resize = useResize();

  const colCount = useMemo(() => Math.round(sizes.container.width / sizes.item.width), [sizes]);
  const rowCount = useMemo(() => Math.ceil(items.length / colCount), [sizes]);

  const calculateStyle = (args: StyleArgs) => (index): UseSpringProps<any> => {
    const {indexOrder, down, originalIndex, currentIndex, x, y, immediate} = args;
    const calculateX = (index): number => (index % colCount) * sizes.item.width;
    const calculateY = (index): number => Math.floor(index / colCount) * sizes.item.height;
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

  const calculateNewIndex = (count, index, x, y): number => {
    const currentCol = index % colCount;
    const currentRow = Math.floor(index / colCount);
    const newCol = clamp(Math.round((currentCol * sizes.item.width + x) / sizes.item.width), 0, colCount - 1);
    const newRow = clamp(Math.round((currentRow * sizes.item.height + y) / sizes.item.height), 0, rowCount - 1);
    return clamp(newCol + newRow * colCount, 0, count - 1);
  };

  const [springs, setSprings] = useSprings(items.length, calculateStyle({indexOrder: order.current}));

  const bind = useDrag(({args: [originalIndex], down, movement: [x, y]}) => {
    const currentIndex = order.current.indexOf(originalIndex);
    const newIndex = calculateNewIndex(items.length, currentIndex, x, y);
    const newOrder = move(order.current, currentIndex, newIndex);
    setSprings(calculateStyle({indexOrder: newOrder, down, originalIndex, currentIndex, x, y}));
    if (!down) order.current = newOrder;
  });

  useEffect(() => {
    const containerRef = ref.current;
    const itemRef = ref.current && ref.current.childNodes ? ref.current.childNodes[0] : null;
    if (containerRef && itemRef) {
      setSizes({
        container: {width: containerRef.clientWidth, height: containerRef.clientHeight},
        item: {width: itemRef.clientWidth, height: itemRef.clientHeight},
      });
    }
  }, [ref, resize]);

  useEffect(() => {
    order.current = items.map((_, index) => index);
    setSprings(calculateStyle({indexOrder: order.current, immediate: true}));
    setHeight(sizes.item.height * rowCount);
  }, [items, sizes]);

  const sortingProps = {
    sortingRef: ref,
    setSortingItems: setItems,
    sortingOrder: order,
    sortingSprings: springs,
    sortingBind: bind,
    sortingHeight: height,
  };

  return <Component {...sortingProps} {...props} />;
};

export default withSortableGrid;
