import * as React from 'react';
import {ComponentType} from 'react';
import {RECAPTCHA_KEY} from '../../constants';
import {GoogleReCaptchaProvider, useGoogleReCaptcha} from 'react-google-recaptcha-v3';
import {flowRight} from 'lodash';

export type CaptchaProps = {
  getToken: () => Promise<string>;
};

const withCaptcha = (Component: ComponentType<CaptchaProps>) => (props: any) => {
  const {executeRecaptcha} = useGoogleReCaptcha();

  const getToken = async (): Promise<string> => {
    return await executeRecaptcha();
  };

  return <Component {...props} getToken={getToken} />;
};

const withCaptchaProvider = (Component: ComponentType) => (props: any) => {
  return (
    <GoogleReCaptchaProvider reCaptchaKey={RECAPTCHA_KEY}>
      <Component {...props} />
    </GoogleReCaptchaProvider>
  );
};

export default flowRight([withCaptchaProvider, withCaptcha]);
