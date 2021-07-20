import * as React from 'react';
import {ComponentType, FC, ReactElement, useState} from 'react';
import {RECAPTCHA_KEY, RECAPTCHA_LIFETIME} from '../../constants';
import {GoogleReCaptchaProvider, useGoogleReCaptcha} from 'react-google-recaptcha-v3';

export type CaptchaProps = {
  getToken: () => Promise<string>;
};

export const withCaptcha =
  (Component: ComponentType<CaptchaProps>): FC =>
    (props): ReactElement => {
      const {executeRecaptcha} = useGoogleReCaptcha();
      const [lastToken, setLastToken] = useState<string>('');
      const [tokenUpdateTime, setTokenUpdateTime] = useState<number>(0);

      const getCurrentTime = (): number => {
        return new Date().getTime() / 1000;
      };

      const isTokenActual = (currentTime: number): boolean => {
        return tokenUpdateTime && currentTime - tokenUpdateTime < RECAPTCHA_LIFETIME;
      };

      const getToken = async (): Promise<string> => {
        const currentTime = getCurrentTime();
        if (lastToken && isTokenActual(currentTime)) {
          return lastToken;
        } else {
          const token = await executeRecaptcha();
          setLastToken(token);
          setTokenUpdateTime(currentTime);
          return token;
        }
      };

      return <Component {...props} getToken={getToken} />;
    };

export const withCaptchaProvider =
  (Component: ComponentType): FC =>
    (props): ReactElement => {
      return (
        <GoogleReCaptchaProvider reCaptchaKey={RECAPTCHA_KEY}>
          <Component {...props} />
        </GoogleReCaptchaProvider>
      );
    };
