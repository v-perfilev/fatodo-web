import React, {FC, ReactElement, useRef} from 'react';
import {CellMeasurerCache, ListRowProps} from 'react-virtualized';
import {virtualizedListMeasurerStyles} from './_styles';
import {RefUtils} from '../../../../shared/utils/ref.utils';

type Props = {
  cellMeasurerCache: CellMeasurerCache,
  renderer: (params: ListRowProps) => ReactElement;
  loadedLength: number;
  scrollAfterLoad: (heightDifference: number) => void;
};

const measurerId = 'virtualized-list-measurer';

const VirtualizedListMeasurer: FC<Props> = ({cellMeasurerCache, renderer, loadedLength, scrollAfterLoad}: Props) => {
  const classes = virtualizedListMeasurerStyles();
  const prevValues = RefUtils.usePrevious({loadedLength});
  const indexesToMeasureMap = useRef<Map<number, number>>();
  const afterLoad = useRef<boolean>();
  const heightDifference = useRef<number>();

  const updateAfterLoad = (): void => {
    const prevLoadLength = prevValues?.loadedLength;
    const newItemsCount = loadedLength - prevLoadLength;
    afterLoad.current = prevLoadLength > 0 && newItemsCount > 1;
  };

  const scrollIfAfterLoad = (): void => {
    if (afterLoad.current) {
      afterLoad.current = false;
      // scrollAfterLoad(heightDifference.current);
    }
  };

  const shiftCacheAfterLoad = (): void => {
    if (afterLoad.current) {
      const prevLoadLength = prevValues?.loadedLength;
      const newItemsCount = loadedLength - prevLoadLength;
      for (let i = prevValues.loadedLength - 1; i >= 0; i--) {
        const height = cellMeasurerCache.getHeight(i, 0);
        cellMeasurerCache.set(i + newItemsCount, 0, 0, height);
      }
      for (let i = 0; i < newItemsCount; i++) {
        cellMeasurerCache.clear(i, 0);
      }
    }
  };

  const measure = (): void => {
    const measurer = document.getElementById(measurerId);
    let newHeightDifference = 0;
    if (measurer && indexesToMeasureMap.current) {
      Array.from(indexesToMeasureMap.current.keys()).forEach((index) => {
        const i = indexesToMeasureMap.current.get(index);
        const elementHeight = measurer.children[i].clientHeight;
        cellMeasurerCache.set(i, 0, 0, elementHeight);
        newHeightDifference += elementHeight;
      });
      heightDifference.current = newHeightDifference;
    }
  };

  const fillMapToMeasure = (): void => {
    indexesToMeasureMap.current = new Map();
    Array.from(Array(loadedLength).keys())
      .filter(index => !cellMeasurerCache.has(index, 0))
      .forEach((index, i) => {
        indexesToMeasureMap.current.set(index, i);
      });
  };

  const buildRendererProps = (index: number): ListRowProps => {
    return {
      index,
      columnIndex: index,
      isScrolling: false,
      isVisible: false,
      key: index + '_0',
      parent: undefined,
      style: undefined
    };
  };

  const finalRender = (): ReactElement => {
    return (
      <div id={measurerId} className={classes.measurer}>
        {Array.from(indexesToMeasureMap.current.values()).map((index, key) => (
          <div key={key}>
            {renderer(buildRendererProps(index))}
          </div>
        ))}
      </div>
    );
  };

  measure();
  updateAfterLoad();
  shiftCacheAfterLoad();
  scrollIfAfterLoad();
  fillMapToMeasure();
  return finalRender();

};

export default VirtualizedListMeasurer;
