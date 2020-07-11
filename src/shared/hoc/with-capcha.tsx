import * as React from 'react';
import {ComponentType, FC, ReactElement, useEffect, useState} from 'react';
import {useGoogleReCaptcha} from 'react-google-recaptcha-v3';

export type CaptchaProps = {
  token: string;
};

const withCaptcha = (Component: ComponentType<CaptchaProps>): FC => (props): ReactElement => {
  const {executeRecaptcha} = useGoogleReCaptcha();
  const [token, setToken] = useState('');
  let isMounted = true;

  useEffect(() => {
    executeRecaptcha()
      .then((token) => {
        if (isMounted) {
          setToken(token);
        }
      })
      .catch(() => {
        // skip
      });
    return (): void => {
      isMounted = false;
    };
  }, []);

  return <Component {...props} token={token} />;
};

export default withCaptcha;
