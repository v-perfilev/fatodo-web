import * as React from 'react';
import {ComponentType, FC, ReactElement, useEffect, useState} from 'react';
import {Redirect} from 'react-router-dom';

export interface RedirectTimerProps {
  timer: number;
  resetTimer: () => void;
}

const withRedirectTimer = (redirectLink = '/', timerInitValue = 50) => (
  Component: ComponentType<RedirectTimerProps>
): FC<null> => (): ReactElement => {
  const [timer, setTimer] = useState<number>(timerInitValue);
  let timerId;

  useEffect(() => {
    if (timer > 0 && !timerId) {
      timerId = setTimeout(() => setTimer((prevState) => prevState - 1), 1000);
    }
    return (): void => clearTimeout(timerId);
  }, [timer]);

  const resetTimer = (): void => {
    setTimer(0);
    clearTimeout(timerId);
  };

  return timer === 0 ? <Redirect to={redirectLink} /> : <Component timer={timer} resetTimer={resetTimer} />;
};

export default withRedirectTimer;
