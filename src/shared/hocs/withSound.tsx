import React, {ComponentType, memo, useCallback, useMemo} from 'react';
import {flowRight} from 'lodash';
import {SoundContext} from '../contexts/SoundContext';

const ding = new Audio('/audio/ding.mp3');

const withSound = (Component: ComponentType) => (props: any) => {
  const playDing = useCallback(() => {
    ding.play().finally();
  }, []);

  const value = useMemo(
    () => ({
      playDing,
    }),
    [],
  );

  return (
    <SoundContext.Provider value={value}>
      <Component {...props} />
    </SoundContext.Provider>
  );
};

export default flowRight([memo, withSound]);
