import React, {CSSProperties, memo, ReactElement, useCallback, useEffect, useMemo, useRef} from 'react';
import {ListKeysCache, ListMeasurerCache} from './caches';
import {ListChildComponentProps} from 'react-window';
import {useForceUpdate} from '../../../../shared/hooks/useForceUpdate';

type VirtualizedListMeasurerProps<T> = {
  itemRenderer: (params: ListChildComponentProps) => ReactElement;
  itemData: T[];
  keyExtractor?: (index: number) => string;
  measurerCache: ListMeasurerCache;
  keyCache: ListKeysCache;
  afterMeasured: () => void;
};

const VirtualizedListMeasurer = (props: VirtualizedListMeasurerProps<any>) => {
  const {itemRenderer, itemData, keyExtractor, measurerCache, keyCache, afterMeasured} = props;
  const forceUpdate = useForceUpdate();
  const measurerRef = useRef<HTMLDivElement>();
  const indexesToMeasureMap = useRef<Map<number, number>>();

  const loadedLength = useMemo<number>(() => {
    return itemData.length;
  }, [itemData]);

  const shouldUpdateCaches = useCallback((): boolean => {
    const keysInCache = Array.from(Array(loadedLength).keys())
      .map((index) => keyExtractor(index))
      .filter((key) => keyCache.keys().includes(key));
    return loadedLength !== keysInCache.length || loadedLength !== keyCache.size();
  }, [itemData]);

  const updateCaches = useCallback((): void => {
    // clear key cache
    keyCache.clear();
    // update key cache
    for (let i = 0; i < loadedLength; i++) {
      const key = keyExtractor(i);
      keyCache.set(i, key);
    }
    // remove unused keys from measurer cache
    Array.from(measurerCache.keys()).forEach((key) => {
      if (!keyCache.keys().includes(key)) {
        measurerCache.clear(key);
      }
    });
    forceUpdate();
  }, [itemData]);

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
