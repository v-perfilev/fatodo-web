import {useState} from 'react';
import {DateUtils} from '../utils/DateUtils';

export const useDelayedState = (initialValue = true, timeout = 500): [boolean, (value: boolean) => void] => {
  const [value, setValue] = useState<boolean>(initialValue);
  let timer: number;
  let timerId: number;

  const resetTimer = (): void => {
    timer = DateUtils.getNowTime();
  };

  const getTimeDifference = (): number => {
    const now = DateUtils.getNowTime();
    return timer + timeout - now;
  };

  const updateValue = (newValue: boolean): void => {
    if (newValue) {
      resetTimer();
      window.clearTimeout(timerId);
      setValue(true);
    } else {
      const timeDifference = getTimeDifference();
      if (timeDifference > 0) {
        timerId = window.setTimeout(() => setValue(false), timeDifference);
      } else {
        setValue(false);
      }
    }
  };

  resetTimer();
  return [value, updateValue];
};
