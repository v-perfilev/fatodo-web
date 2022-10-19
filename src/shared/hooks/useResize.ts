import {useLayoutEffect, useState} from 'react';

export const useResize = (): [number, number] => {
  const [size, setSize] = useState<[number, number]>([0, 0]);

  const updateSize = (): void => {
    setSize([window.innerWidth, window.innerHeight]);
  };

  useLayoutEffect(() => {
    updateSize();
    window.addEventListener('resize', updateSize);
    return (): void => window.removeEventListener('resize', updateSize);
  }, []);

  return size;
};
