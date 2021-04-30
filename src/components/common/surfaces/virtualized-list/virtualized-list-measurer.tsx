import React, {FC, memo, ReactElement, useCallback, useEffect, useRef, useState} from 'react';
import {virtualizedListMeasurerStyles} from './_styles';
import {ListChildComponentProps} from 'react-window';
import {ListKeysCache, ListMeasurerCache} from './_caches';

type Props = {
  measurerCache: ListMeasurerCache;
  keyCache: ListKeysCache;
  itemRenderer: (params: ListChildComponentProps) => ReactElement;
  loadedItems: number;
  afterMeasure: () => void;
};

const VirtualizedListMeasurer: FC<Props> = (props: Props) => {
  const {measurerCache, keyCache, itemRenderer, loadedItems, afterMeasure} = props;
  const classes = virtualizedListMeasurerStyles();
  const measurerRef = useRef<HTMLDivElement>();
  const indexesToMeasureMap = useRef<Map<number, number>>();
  const [, updateState] = useState<{}>();

  const forceUpdate = useCallback(() => {
    updateState({});
  }, []);

  const measure = useCallback(() => {
    if (measurerRef.current && indexesToMeasureMap.current?.size > 0) {
      Array.from(indexesToMeasureMap.current.entries()).forEach(([index, i]) => {
        const key = keyCache.get(index);
        const height = measurerRef.current.children[i].clientHeight;
        measurerCache.setHeight(key, height);
      });
      indexesToMeasureMap.current = undefined;
      forceUpdate();
      afterMeasure();
    }
  }, [forceUpdate, forceUpdate]);

  const fillMapToMeasure = useCallback(() => {
    const indexes = Array.from(Array(loadedItems).keys()).filter((index) => {
      const key = keyCache.get(index);
      return !measurerCache.has(key);
    });
    if (indexes.length > 0) {
      indexesToMeasureMap.current = new Map();
      indexes.forEach((index, i) => {
        indexesToMeasureMap.current.set(index, i);
      });
      forceUpdate();
    }
  }, [forceUpdate, loadedItems]);

  useEffect(() => {
    measure();
  });

  useEffect(() => {
    fillMapToMeasure();
  }, [loadedItems]);

  return indexesToMeasureMap.current ? (
    <div className={classes.measurer} ref={measurerRef}>
      {Array.from(indexesToMeasureMap.current.keys()).map((index, key) => (
        <div key={key}>
          {itemRenderer({index, style: undefined, data: undefined})}
        </div>
      ))}
    </div>
  ) : null;
};

const shouldNotUpdate = (props: Props, prevProps: Props) => {
  return props.loadedItems === 0 || props.loadedItems === prevProps.loadedItems;
};

export default memo(VirtualizedListMeasurer, shouldNotUpdate);
