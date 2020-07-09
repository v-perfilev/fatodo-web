import * as React from 'react';
import {ComponentType, CSSProperties, FC, MutableRefObject, ReactElement, useEffect, useRef, useState} from 'react';
import {UseSpringProps, useSprings} from 'react-spring';
import {useDrag} from 'react-use-gesture';
import withSizes, {SizeProps} from './with-sizes';
import {clamp} from 'lodash-es';
import move from 'lodash-move';

interface StyleArgs {
  indexOrder: any;
  down?: boolean;
  originalIndex?: number;
  currentIndex?: number;
  x?: number;
  y?: number;
}

export type SortingProps = SizeProps & {
  setSortingItems: (items: any[]) => void;
  sortingOrder: MutableRefObject<number[]>;
  sortingSprings: CSSProperties[];
  sortingBind: (...any) => void;
}

type Props = SizeProps;

const withSortableGrid = (Component: ComponentType<SortingProps>): FC<Props> =>
  withSizes((props): ReactElement => {
    const {gridRef, sizes} = props;
    const order = useRef(null);
    const [items, setItems] = useState([]);

    const rootSize = sizes && sizes.length > 0 ? sizes[0] : null;
    const firstChildSize = sizes && sizes.length > 1 ? sizes[1] : null;

    useEffect(() => {
      order.current = items.map((_, index) => index);
      setSprings(calculateStyle({indexOrder: order.current}));
    }, [items, firstChildSize]);

    const calculateStyle = ({indexOrder, down, originalIndex, currentIndex, x, y}: StyleArgs) => (index): UseSpringProps => {
      if (!rootSize || !firstChildSize) {
        return {};
      }
      const colCount = rootSize.width / firstChildSize.width;
      const calculateX = (index) => index % colCount * firstChildSize.width;
      const calculateY = (index) => Math.floor(index / colCount) * firstChildSize.height;
      if (down && index === originalIndex) {
        const xOffset = calculateX(currentIndex) + x;
        const yOffset = calculateY(currentIndex) + y;
        return {transform: `translate3d(${xOffset}px,${yOffset}px,0)`, zIndex: 10000, immediate: true};
      } else {
        const xOffset = calculateX(indexOrder.indexOf(index));
        const yOffset = calculateY(indexOrder.indexOf(index));
        return {transform: `translate3d(${xOffset}px,${yOffset}px,0)`, zIndex: 0, immediate: false};
      }
    };

    const calculateNewIndex = (count, index, x, y): number => {
      if (!rootSize || !firstChildSize) {
        return 0;
      }
      const colCount = rootSize.width / firstChildSize.width;
      const rowCount = Math.ceil(count / colCount);
      const currentCol = index % colCount;
      const currentRow = Math.floor(index / colCount);
      const newCol = clamp(Math.round((currentCol * firstChildSize.width + x) / firstChildSize.width), 0, colCount - 1);
      const newRow = clamp(Math.round((currentRow * firstChildSize.height + y) / firstChildSize.height), 0, rowCount - 1);
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

    return (
      <Component gridRef={gridRef} sizes={sizes} setSortingItems={setItems}
                 sortingOrder={order} sortingBind={bind}
                 sortingSprings={springs} {...props} />
    );
  });

export default withSortableGrid;
