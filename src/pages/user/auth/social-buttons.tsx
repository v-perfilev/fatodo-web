import * as React from 'react';
import {FC, useState} from 'react';
import {API_URL, BASE_URL} from '../../../constants';
import {LanguageUtils} from '../../../shared/utils/language.utils';
import {useTranslation} from 'react-i18next';
import {Routes} from '../../router';
import {FacebookIcon} from '../../../components/icons/FacebookIcon';
import {GoogleIcon} from '../../../components/icons/GoogleIcon';
import {Box, Divider, Typography} from '@material-ui/core';
import {socialButtonsStyles} from '../_styles';
import {LoadingButton} from '../../../components/controls';
import {DateUtils} from '../../../shared/utils/date.utils';

export const SocialButtons: FC = () => {
  const classes = socialButtonsStyles();
  const {t} = useTranslation();
  const [facebookLoading, setFacebookLoading] = useState(false);
  const [googleLoading, setGoogleLoading] = useState(false);

  const oAuth2Login = (provider: string): void => {
    const apiUrl = API_URL + '/oauth2/authorize/' + provider;
    const languageParam = 'language=' + LanguageUtils.getLanguage();
    const timezoneParam = 'timezone=' + DateUtils.getTimezone();
    const redirectParam = 'redirect=' + BASE_URL + Routes.SOCIAL_LOGIN;
    window.location.href = apiUrl + '?' + languageParam + '&' + timezoneParam + '&' + redirectParam;
  };

  const facebookLogin = (): void => {
    setFacebookLoading(true);
    oAuth2Login('facebook');
  };

  const googleLogin = (): void => {
    setGoogleLoading(true);
    oAuth2Login('google');
  };

  const disabled = facebookLoading || googleLoading;

  return (
    <>
      <Box className={classes.header}>
        <Divider />
        <Typography className={classes.caption}>{t('auth.socialLogin')}</Typography>
        <Divider />
      </Box>
      <Box m={2} />
      <Box className={classes.buttons}>
        <LoadingButton
          startIcon={<FacebookIcon />}
          onClick={facebookLogin}
          variant="outlined"
          fullWidth={true}
          loading={facebookLoading}
          disabled={disabled}
        >
          Facebook
        </LoadingButton>
        <LoadingButton
          startIcon={<GoogleIcon />}
          onClick={googleLogin}
          variant="outlined"
          fullWidth={true}
          loading={googleLoading}
          disabled={disabled}
        >
          Google
        </LoadingButton>
      </Box>
    </>
  );
};
