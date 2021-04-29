import React, {FC, ReactElement, useRef} from 'react';
import {virtualizedListMeasurerStyles} from './_styles';
import {ListChildComponentProps} from 'react-window';
import {ListKeysCache, ListMeasurerCache} from './_caches';

type Props = {
  measurerCache: ListMeasurerCache;
  keyCache: ListKeysCache;
  renderer: (params: ListChildComponentProps) => ReactElement;
  loadedLength: number;
};

const measurerIdPrefix = 'virtualized-list-measurer–';

const VirtualizedListMeasurer: FC<Props> = ({measurerCache, keyCache, renderer, loadedLength}: Props) => {
  const classes = virtualizedListMeasurerStyles();
  const measurerId = useRef<string>(measurerIdPrefix + Math.random());
  const indexesToMeasureMap = useRef<Map<number, number>>();

  const measure = (): void => {
    const measurer = document.getElementById(measurerId.current);
    if (measurer && indexesToMeasureMap.current) {
      Array.from(indexesToMeasureMap.current.keys()).forEach((index) => {
        const i = indexesToMeasureMap.current.get(index);
        const key = keyCache.get(index);
        const height = measurer.children[i].clientHeight;
        measurerCache.setHeight(key, height);
      });
      indexesToMeasureMap.current = undefined;
    }
  };

  const fillMapToMeasure = (): void => {
    const indexes = Array.from(Array(loadedLength).keys()).filter((index) => {
      const key = keyCache.get(index);
      return !measurerCache.has(key);
    });
    if (indexes.length > 0) {
      indexesToMeasureMap.current = new Map();
      indexes.forEach((index, i) => {
        indexesToMeasureMap.current.set(index, i);
      });
    }
  };

  measure();
  fillMapToMeasure();

  return indexesToMeasureMap.current ? (
    <div id={measurerId.current} className={classes.measurer}>
      {Array.from(indexesToMeasureMap.current.values()).map((index, key) => (
        <div key={key}>{renderer({index, style: undefined, data: undefined})}</div>
      ))}
    </div>
  ) : null;
};

export default VirtualizedListMeasurer;
