import * as React from 'react';
import {ComponentType, FC, ReactElement, useEffect, useState} from 'react';
import {GoogleReCaptchaProvider, useGoogleReCaptcha} from 'react-google-recaptcha-v3';
import {RECAPTCHA_KEY} from '../../constants';
import {LanguageUtils} from '../utils/language.utils';
import {compose} from 'recompose';

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

  const updateToken = (): void => setShouldUpdate((prevState) => !prevState);

  const updateCaptcha = (): void => {
    executeRecaptcha().then((token) => {
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
    window.clearInterval(interval);
    interval = window.setInterval(() => updateCaptcha(), 30 * 1000);
  }, [shouldUpdate]);

  return <Component {...props} token={token} updateToken={updateToken} />;
};

const withCaptchaProvider = (Component: ComponentType): FC => (props): ReactElement => {
  return (
    <GoogleReCaptchaProvider reCaptchaKey={RECAPTCHA_KEY} language={LanguageUtils.getLanguage()}>
      <Component {...props} />
    </GoogleReCaptchaProvider>
  );
};

export default compose(withCaptchaProvider, withCaptcha);
