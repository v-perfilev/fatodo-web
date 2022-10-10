import * as React from 'react';
import {ComponentType, FC, ReactElement} from 'react';
import {RECAPTCHA_KEY} from '../../../constants';
import {GoogleReCaptchaProvider, useGoogleReCaptcha} from 'react-google-recaptcha-v3';
import {flowRight} from 'lodash';

export type CaptchaProps = {
  getToken: () => Promise<string>;
};

const withCaptcha = (Component: ComponentType<CaptchaProps>): FC => (props): ReactElement => {
  const {executeRecaptcha} = useGoogleReCaptcha();

  const getToken = async (): Promise<string> => {
    return await executeRecaptcha();
  };

  return <Component {...props} getToken={getToken} />;
};

const withCaptchaProvider = (Component: ComponentType): FC => (props): ReactElement => {
  return (
    <GoogleReCaptchaProvider reCaptchaKey={RECAPTCHA_KEY}>
      <Component {...props} />
    </GoogleReCaptchaProvider>
  );
};

export default flowRight([withCaptchaProvider, withCaptcha]);
