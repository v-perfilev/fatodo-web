import {useLayoutEffect, useState} from 'react';

export const useResize = (): any => {
  const [size, setSize] = useState([0, 0]);
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
