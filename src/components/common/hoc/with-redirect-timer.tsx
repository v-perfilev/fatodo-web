import * as React from 'react';
import {ComponentType, FC, ReactElement, useEffect, useState} from 'react';
import {Redirect} from 'react-router-dom';

export interface RedirectTimerProps {
  timer: number;
  resetTimer: () => void;
}

const withRedirectTimer = (redirectLink = '/', timerInitValue = 5) => (
  Component: ComponentType<RedirectTimerProps>
): FC<null> => (): ReactElement => {
  const [timer, setTimer] = useState<number>(timerInitValue);
  const [timeoutId, setTimeoutId] = useState<number>(null);

  useEffect(() => {
    if (timer > 0) {
      const timeout = window.setTimeout(() => setTimer((t) => t - 1), 1000);
      setTimeoutId(timeout);
    }
  }, [timer]);

  const resetTimer = (): void => {
    window.clearTimeout(timeoutId);
    setTimer(0);
  };

  return timer < 1 ? <Redirect to={redirectLink} /> : <Component timer={timer} resetTimer={resetTimer} />;
};

export default withRedirectTimer;
