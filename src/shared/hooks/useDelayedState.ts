import {useRef, useState} from 'react';
import {DateUtils} from '../utils/DateUtils';

export const useDelayedState = (initialValue = true, timeout = 500): [boolean, (value: boolean) => void] => {
  const [value, setValue] = useState<boolean>(initialValue);
  const timer = useRef<number>();
  const timerId = useRef<number>();

  const resetTimer = (): void => {
    timer.current = DateUtils.getNowTime();
  };

  const getTimeDifference = (): number => {
    const now = DateUtils.getNowTime();
    return timer.current + timeout - now;
  };

  const updateValue = (newValue: boolean): void => {
    if (newValue) {
      resetTimer();
      window.clearTimeout(timerId.current);
      setValue(true);
    } else {
      const timeDifference = getTimeDifference();
      if (timeDifference > 0) {
        timerId.current = window.setTimeout(() => setValue(false), timeDifference);
      } else {
        setValue(false);
      }
    }
  };

  resetTimer();
  return [value, updateValue];
};
