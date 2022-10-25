import React, {CSSProperties, memo, ReactElement, useCallback, useEffect, useMemo, useRef, useState} from 'react';
import {ListKeysCache, ListMeasurerCache} from './caches';
import {ListDataProps} from './types';
import {ListChildComponentProps} from 'react-window';

type VirtualizedListMeasurerProps = {
  itemRenderer: (params: ListChildComponentProps) => ReactElement;
  itemData: ListDataProps;
  itemKey: (index: number) => string;
  measurerCache: ListMeasurerCache;
  keyCache: ListKeysCache;
  afterMeasured: () => void;
};

const VirtualizedListMeasurer = (props: VirtualizedListMeasurerProps) => {
  const {itemRenderer, itemData, itemKey, measurerCache, keyCache, afterMeasured} = props;
  const measurerRef = useRef<HTMLDivElement>();
  const indexesToMeasureMap = useRef<Map<number, number>>();
  const [, updateState] = useState<{}>();

  const forceUpdate = useCallback(() => {
    updateState({});
  }, []);

  const loadedLength = useMemo<number>(() => {
    return itemData.items.length;
  }, [itemData.items]);

  const shouldUpdateCaches = useCallback((): boolean => {
    const keysInCache = Array.from(Array(loadedLength).keys())
      .map((index) => itemKey(index))
      .filter((key) => keyCache.keys().includes(key));
    return loadedLength !== keysInCache.length;
  }, [loadedLength]);

  const updateCaches = useCallback((): void => {
    // update key cache
    for (let i = 0; i < loadedLength; i++) {
      const key = itemKey(i);
      keyCache.set(i, key);
    }
    // remove unused keys from measurer cache
    Array.from(measurerCache.keys()).forEach((key) => {
      if (!keyCache.keys().includes(key)) {
        measurerCache.clear(key);
      }
    });
    forceUpdate();
  }, [loadedLength]);

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
  }, []);

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
  }, [loadedLength]);

  useEffect(() => {
    measure();
    if (shouldUpdateCaches()) {
      updateCaches();
      fillMapToMeasure();
    }
  });

  return indexesToMeasureMap.current ? (
    <div style={measurerStyles} ref={measurerRef}>
      {Array.from(indexesToMeasureMap.current.keys()).map((index, key) => (
        <div key={key}>{itemRenderer({index, style: undefined, data: itemData})}</div>
      ))}
    </div>
  ) : null;
};

const measurerStyles: CSSProperties = {
  position: 'absolute',
  width: '100%',
  height: 1,
  visibility: 'hidden',
  zIndex: -1,
};

export default memo(VirtualizedListMeasurer);
