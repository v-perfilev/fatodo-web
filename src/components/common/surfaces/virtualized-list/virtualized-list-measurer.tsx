import React, {FC, memo, ReactElement, useCallback, useEffect, useRef, useState} from 'react';
import {virtualizedListMeasurerStyles} from './_styles';
import {ListChildComponentProps} from 'react-window';
import {ListKeysCache, ListMeasurerCache} from './_caches';

type Props = {
  measurerCache: ListMeasurerCache;
  keyCache: ListKeysCache;
  renderer: (params: ListChildComponentProps) => ReactElement;
  afterMeasure: () => void;
};

const VirtualizedListMeasurer: FC<Props> = ({measurerCache, keyCache, renderer, afterMeasure}: Props) => {
  const classes = virtualizedListMeasurerStyles();
  const measurerRef = useRef<HTMLDivElement>();
  const indexesToMeasureMap = useRef<Map<number, number>>();
  const [, updateState] = useState<{}>();

  const forceUpdate = useCallback(() => {
    updateState({});
  }, []);

  useEffect(() => {
    if (measurerRef.current && indexesToMeasureMap.current?.size > 0) {
      Array.from(indexesToMeasureMap.current.entries()).forEach(([index, i]) => {
        const key = keyCache.get(index);
        const height = measurerRef.current.children[i].clientHeight;
        measurerCache.setHeight(key, height);
      });
      indexesToMeasureMap.current = undefined;
      afterMeasure();
      forceUpdate();
    }
  });

  useEffect(() => {
    const indexes = Array.from(Array(keyCache.size()).keys()).filter((index) => {
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
  }, [keyCache.size()]);

  return indexesToMeasureMap.current ? (
    <div className={classes.measurer} ref={measurerRef}>
      {Array.from(indexesToMeasureMap.current.keys()).map((index, key) => (
        <div key={key}>{renderer({index, style: undefined, data: undefined})}</div>
      ))}
    </div>
  ) : null;
};

const shouldNotUpdate = (props: Props, prevProps: Props) => {
  return props.keyCache.size() === 0 || props.keyCache.size() === prevProps.keyCache.size();
};

export default memo(VirtualizedListMeasurer, shouldNotUpdate);
