import * as React from 'react';
import {FC} from 'react';
import {API_URL, BASE_URL} from '../../constants';
import {LanguageUtils} from '../../shared/utils/language.utils';
import {Button} from '@material-ui/core';
import {compose} from 'recompose';
import {withTranslation} from 'react-i18next';
import {Routes} from '../router';

const SocialButtons: FC = () => {

  const oAuth2Login = (provider: string): void => {
    const apiUrl = API_URL + '/oauth2/authorize/' + provider;
    const languageParam = 'language=' + LanguageUtils.getLanguage();
    const redirectParam = 'redirect=' + BASE_URL + Routes.SOCIAL_LOGIN;
    window.location.href = apiUrl + '?' + languageParam + '&' + redirectParam;
  };

  const facebookLogin = (): void => oAuth2Login('facebook');

  const googleLogin = (): void => oAuth2Login('google');

  return (
    <>
      <Button color="primary" onClick={facebookLogin}>
        Facebook
      </Button>
      <Button color="primary" onClick={googleLogin}>
        Google
      </Button>
    </>
  );
};

export default compose(withTranslation())(SocialButtons);
