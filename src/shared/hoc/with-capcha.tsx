import * as React from 'react';
import {ComponentType, FC, ReactElement, useEffect, useState} from 'react';
import {useGoogleReCaptcha} from 'react-google-recaptcha-v3';

export interface CaptchaProps {
  token: string;
}

const withCaptcha = (Component: ComponentType<CaptchaProps>): FC => (): ReactElement => {
  const [token, setToken] = useState('');
  const {executeRecaptcha} = useGoogleReCaptcha();

  useEffect(() => {
    executeRecaptcha()
      .then((token) => setToken(token))
      .catch(() => {
        // skip
      });
  }, []);

  return <Component token={token} />;
};

export default withCaptcha;
