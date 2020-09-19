import * as React from 'react';
import {ComponentType, FC, ReactElement, useEffect, useState} from 'react';
import {useGoogleReCaptcha} from 'react-google-recaptcha-v3';

export type CaptchaProps = {
  token: string;
  updateToken: () => void;
};

const withCaptcha = (Component: ComponentType<CaptchaProps>): FC => (props): ReactElement => {
  const {executeRecaptcha} = useGoogleReCaptcha();
  const [token, setToken] = useState('');
  const [shouldUpdate, setShouldUpdate] = useState(true);
  let isMounted = true;
  let interval = null;

  const updateToken = () => setShouldUpdate(prevState => !prevState);

  const updateCaptcha = (): void => {
    executeRecaptcha()
      .then((token) => {
        if (isMounted) {
          setToken(token);
        }
      });
  };

  useEffect(() => {
    return (): void => {
      window.clearInterval(interval);
      isMounted = false;
    };
  }, []);

  useEffect(() => {
    updateCaptcha();
    interval = window.setInterval(() => updateCaptcha(), 30 * 1000);
  }, [shouldUpdate]);

  return <Component {...props} token={token} updateToken={updateToken} />;
};

export default withCaptcha;
