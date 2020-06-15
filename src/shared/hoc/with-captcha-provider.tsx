import * as React from 'react';
import {ComponentType, FC, ReactElement} from 'react';
import {RECAPTCHA_KEY} from '../../constants';
import {GoogleReCaptchaProvider} from 'react-google-recaptcha-v3';
import {LanguageUtils} from '../utils/language.utils';

const withCaptchaProvider = (Component: ComponentType): FC => (props): ReactElement => {
  return (
    <GoogleReCaptchaProvider reCaptchaKey={RECAPTCHA_KEY} language={LanguageUtils.getLanguage()}>
      <Component {...props} />
    </GoogleReCaptchaProvider>
  );
};

export default withCaptchaProvider;
