import React, {FC, memo, ReactElement, useCallback, useEffect, useMemo, useRef, useState} from 'react';
import {virtualizedListMeasurerStyles} from './_styles';
import {ListKeysCache, ListMeasurerCache} from './_caches';
import {ListItemDataProps, ListItemProps} from './types';

type Props = {
  itemRenderer: (params: ListItemProps) => ReactElement;
  itemData: ListItemDataProps;
  measurerCache: ListMeasurerCache;
  keyCache: ListKeysCache;
  afterMeasured: () => void;
};

const VirtualizedListMeasurer: FC<Props> = (props: Props) => {
  const {itemRenderer, itemData, measurerCache, keyCache, afterMeasured} = props;
  const classes = virtualizedListMeasurerStyles();
  const measurerRef = useRef<HTMLDivElement>();
  const indexesToMeasureMap = useRef<Map<number, number>>();
  const [, updateState] = useState<{}>();

  const forceUpdate = useCallback(() => {
    updateState({});
  }, []);

  const loadedLength = useMemo<number>(() => {
    return itemData.items.length;
  }, [itemData.items]);

  const measure = useCallback(() => {
    if (measurerRef.current && indexesToMeasureMap.current?.size > 0) {
      Array.from(indexesToMeasureMap.current.entries()).forEach(([index, i]) => {
        const key = keyCache.get(index);
        const height = measurerRef.current.children[i].clientHeight;
        measurerCache.setHeight(key, height);
      });
      indexesToMeasureMap.current = undefined;
      forceUpdate();
      afterMeasured();
    }
  }, [forceUpdate, forceUpdate]);

  const fillMapToMeasure = useCallback(() => {
    const indexes = Array.from(Array(loadedLength).keys()).filter((index) => {
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
  }, [forceUpdate, loadedLength]);

  useEffect(() => {
    measure();
  });

  useEffect(() => {
    fillMapToMeasure();
  }, [loadedLength]);

  return indexesToMeasureMap.current ? (
    <div className={classes.measurer} ref={measurerRef}>
      {Array.from(indexesToMeasureMap.current.keys()).map((index, key) => (
        <div key={key}>{itemRenderer({index, style: undefined, data: itemData, isVisible: false})}</div>
      ))}
    </div>
  ) : null;
};

const areEqual = (props: Props, prevProps: Props): boolean => {
  return props.itemData.items.length === 0 || props.itemData.items.length === prevProps.itemData.items.length;
};

export default memo(VirtualizedListMeasurer, areEqual);
