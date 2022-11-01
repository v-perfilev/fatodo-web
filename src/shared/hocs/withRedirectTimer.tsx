import React, {ComponentType, useEffect, useState} from 'react';
import {Navigate} from 'react-router-dom';

export type RedirectTimerProps = {
  timer: number;
  resetTimer: () => void;
};

const withRedirectTimer = (redirectLink = '/', timerInitValue = 60) => (
  Component: ComponentType<RedirectTimerProps>,
) => (props: any) => {
  const [timer, setTimer] = useState<number>(timerInitValue);
  let timerId: number;

  useEffect(() => {
    if (timer > 0 && !timerId) {
      timerId = window.setTimeout(() => setTimer((prevState) => prevState - 1), 1000);
    }
    return (): void => window.clearTimeout(timerId);
  }, [timer]);

  const resetTimer = (): void => {
    setTimer(0);
    window.clearTimeout(timerId);
  };

  return timer === 0 ? <Navigate to={redirectLink} /> : <Component {...props} timer={timer} resetTimer={resetTimer} />;
};

export default withRedirectTimer;
