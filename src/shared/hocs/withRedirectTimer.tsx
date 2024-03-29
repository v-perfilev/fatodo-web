import React, {ComponentType, useEffect, useRef, useState} from 'react';
import {RootRoutes} from '../../routes/RootRouter';
import {useNavigate} from 'react-router-dom';

export type RedirectTimerProps = {
  timer: number;
  resetTimer: () => void;
};

const withRedirectTimer = (Component: ComponentType<RedirectTimerProps>) => (props: any) => {
  const navigate = useNavigate();
  const [timer, setTimer] = useState<number>(60);
  const timerId = useRef<number>();

  const redirectToRoot = (): void => navigate(RootRoutes.ROOT);

  useEffect(() => {
    if (timer > 0 && !timerId) {
      timerId.current = window.setTimeout(() => setTimer((prevState) => prevState - 1), 1000);
    }
    if (timer === 0) {
      redirectToRoot();
    }
    return (): void => window.clearTimeout(timerId.current);
  }, [timer]);

  const resetTimer = (): void => {
    window.clearTimeout(timerId.current);
    setTimer(0);
  };

  return <Component {...props} timer={timer} resetTimer={resetTimer} />;
};

export default withRedirectTimer;
